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
            ]),
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
  )  
}

function createInterfaceWithMethods(factory, node) {
  return factory.createInterfaceDeclaration(
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
}

function hasModifier(kind, node) {
  return node.modifiers?.some?.(modifier => modifier.kind === kind)
}

function declarationToSignature(factory, node) {
  switch (node.kind) {
    case ts.SyntaxKind.PropertyDeclaration:
      return factory.createPropertySignature(
        undefined,
        node.name,
        undefined,
        node.type
      );
    case ts.SyntaxKind.MethodDeclaration:
      return factory.createMethodSignature(
        undefined,
        node.name,
        undefined,
        undefined,
        node.parameters,
        node.type
      );
  }
  throw new Error(`Could not convert node of kind ${node.kind} to signature.`);
}

function createNodeWithFactories(factory, node) {
  return [
    ...node.members
      .filter(ts.isConstructorDeclaration)
      .map(member => member.parameters)
      .map(parameters => createFunctionDeclaration(factory, node.name, parameters)),
    node
  ]
}

function createFunctionDeclaration(factory, identifier, parameters) {
  return factory.createFunctionDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    undefined,
    identifier,
    undefined,
    parameters,
    factory.createTypeReferenceNode(
      identifier,
      undefined
    ),
    undefined
  )
}
