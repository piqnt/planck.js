import ts from 'typescript';

export default options => context => node => {
  return ts.visitEachChild(node, (node) => visitor(context.factory, node, options), context);
}

function visitor(factory, node, options) {
  if (node.kind !== ts.SyntaxKind.ClassDeclaration ||
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
            .filter(member => member.kind === ts.SyntaxKind.Constructor)
            .flatMap(member => [
              factory.createConstructSignature(
                undefined,
                member.parameters,
                factory.createTypeReferenceNode(
                  factory.createIdentifier(node.name.escapedText),
                  undefined
                )
              ),
              factory.createCallSignature(
                undefined,
                member.parameters,
                factory.createTypeReferenceNode(
                  factory.createIdentifier(node.name.escapedText),
                  undefined
                )
              )
            ]),
          // static properties
          ...node.members
            .filter(member => member.modifiers?.some?.(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword))
            .filter(member => !member.modifiers?.some?.(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword))
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
      .filter(member => member.kind !== ts.SyntaxKind.Constructor)
      .filter(member => !member.modifiers?.some?.(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword))
      .filter(member => !member.modifiers?.some?.(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword))
      .map(member => declarationToSignature(factory, member))
  );
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
      .filter(node => node.kind === ts.SyntaxKind.Constructor)
      .map(node => node.parameters)
      .map(parameters => createFunctionDeclaration(factory, node.name.escapedText, parameters)),
    node
  ]
}

function createFunctionDeclaration(factory, className, parameters) {
  return factory.createFunctionDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    undefined,
    factory.createIdentifier(className),
    undefined,
    parameters,
    factory.createTypeReferenceNode(
      factory.createIdentifier(className),
      undefined
    ),
    undefined
  )
}
