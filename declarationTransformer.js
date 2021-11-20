import ts from 'typescript';

export default options => context => node => {
  return ts.visitEachChild(node, (node) => visitor(context.factory, node, options), context);
}

function visitor(factory, node, options) {
  if (!ts.isClassDeclaration(node) ||
      !isClassIncluded(node.name.escapedText, options)) {
    return node;
  }
  if (isClassDerived(node)) {
    // workaround for https://github.com/microsoft/TypeScript/issues/46503
    return splitClassIntoConstAndInterface(factory, node);
  }
  return createNodeWithFactories(factory, node);
}

function isClassIncluded(className, options) {
  return options.classes.includes(className);
}

function isClassDerived(node) {
  return node.heritageClauses[0] !== undefined;
}

function splitClassIntoConstAndInterface(factory, node) {
  return [
    createConstNodeWithStaticMethods(factory, node),
    createInterfaceWithMethods(factory, node)
  ];
}

function createConstNodeWithStaticMethods(factory, node) {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        node.name,
        undefined,
        factory.createTypeLiteralNode([
          // constructors
          ...node.members
            .filter(ts.isConstructorDeclaration)
            .flatMap(member => [
              factory.createConstructSignature(
                undefined,
                member.parameters,
                factory.createTypeReferenceNode(
                  node.name,
                  undefined
                )
              ),
              factory.createCallSignature(
                undefined,
                member.parameters,
                factory.createTypeReferenceNode(
                  node.name,
                  undefined
                )
              )
            ].map(node => copyComments(node, member))
          ),
          // static properties
          ...node.members
            .filter(member => hasModifier(ts.SyntaxKind.StaticKeyword, member))
            .filter(member => !hasModifier(ts.SyntaxKind.PrivateKeyword, member))
            .map(member => declarationToSignature(factory, member))
          ]
        ),
        undefined
      )],
      ts.NodeFlags.Const | ts.NodeFlags.Ambient | ts.NodeFlags.ContextFlags
    )
  );
}

function createInterfaceWithMethods(factory, node) {
  const result = factory.createInterfaceDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    node.name,
    undefined,
    node.heritageClauses,
    // instance properties
    node.members
      .filter(member => !ts.isConstructorDeclaration(member))
      .filter(member => !hasModifier(ts.SyntaxKind.StaticKeyword, member))
      .filter(member => !hasModifier(ts.SyntaxKind.PrivateKeyword, member))
      .map(member => declarationToSignature(factory, member))
  );
  return copyComments(result, node);
}

function hasModifier(kind, node) {
  return node.modifiers?.some?.(modifier => modifier.kind === kind);
}

function declarationToSignature(factory, node) {
  let result;
  switch (node.kind) {
    case ts.SyntaxKind.PropertyDeclaration:
      result = factory.createPropertySignature(
        undefined,
        node.name,
        undefined,
        node.type
      );
      break;
    case ts.SyntaxKind.MethodDeclaration:
      result = factory.createMethodSignature(
        undefined,
        node.name,
        undefined,
        undefined,
        node.parameters,
        node.type
      );
      break;
    default:
      throw new Error(`Could not convert node of kind ${node.kind} to signature.`);
  }
  return copyComments(result, node);
}

function createNodeWithFactories(factory, node) {
  return [
    ...node.members
      .filter(ts.isConstructorDeclaration)
      .map(member => member.parameters)
      .map(parameters => createFunctionDeclaration(factory, node, parameters)),
    node
  ];
}

function createFunctionDeclaration(factory, node, parameters) {
  const result = factory.createFunctionDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    undefined,
    node.name,
    undefined,
    parameters,
    factory.createTypeReferenceNode(
      node.name,
      undefined
    ),
    undefined
  );
  return copyComments(result, node);
}

function copyComments(node, original) {
  ts.setSyntheticLeadingComments(node, ts.getSyntheticLeadingComments(original));
  ts.setSyntheticTrailingComments(node, ts.getSyntheticTrailingComments(original));
  return node;
}
