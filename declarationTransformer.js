import ts from 'typescript';

export default options => context => node => {
  return ts.visitEachChild(node, (node) => visitor(context.factory, node, options), context);
}

function visitor(factory, node, options) {
  if (node.kind !== ts.SyntaxKind.ClassDeclaration ||
      !isClassIncluded(node.name.escapedText, options)) {
    return node;
  }
  return createNodeWithFactories(factory, node);
}

function isClassIncluded(className, options) {
  return options.classes.includes(className);
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
