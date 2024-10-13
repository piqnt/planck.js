const ts = require('typescript');

module.exports = options => context => node => {
  return ts.visitEachChild(node, (node) => visitor(context.factory, node, options), context);
}

function visitor(factory, node, options) {
  if (!ts.isClassDeclaration(node) ||
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
      .filter(ts.isConstructorDeclaration)
      .map(member => member.parameters)
      .map(parameters => createFunctionDeclaration(factory, node, parameters))
      .map(node => addFactoryDeprecationToComment(node)),
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

const FACTORY_DEPRECATION_SUFFIX = `*
 * @deprecated Use the 'new' keyword.
 `;

const EMPTY_COMMENTS_FALLBACK = [{
  kind: 3,
  pos: -1,
  end: -1,
  hasTrailingNewLine: true,
  text: '',
}];

function addFactoryDeprecationToComment(node) {
  const comments = ts.getSyntheticLeadingComments(node) ?? EMPTY_COMMENTS_FALLBACK;
  
  const commentsWithDeprecation = comments
    .map(comment => ({
      ...comment,
      text: comment.text + FACTORY_DEPRECATION_SUFFIX,
    }));
  
  ts.setSyntheticLeadingComments(node, commentsWithDeprecation);
  return node;
}
