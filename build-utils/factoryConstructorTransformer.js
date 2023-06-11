import ts from 'typescript';

export default ({ enabled }) => shared => {
  shared.classes = new Set();
  return {
    before: context => node => {
      node = ts.visitEachChild(node, (node) => removeFactoryConstructorDecoratorVisitor(context.factory, node, shared), context);
      if (!enabled) {
        return node;
      }
      return ts.visitEachChild(node, (node) => applyFactoryConstructorDecoratorVisitor(context.factory, node, shared), context);
    },
    afterDeclarations: context => node => {
      if (!enabled) {
        return node;
      }
      return ts.visitEachChild(node, (node) => visitor(context.factory, node, shared), context);
    }
  }
}

function removeFactoryConstructorDecoratorVisitor(factory, node, shared) {
  if (ts.isClassDeclaration(node) && hasFactoryConstructorDecorator(node.decorators)) {
    shared.classes.add(node.name.escapedText);
    return factory.updateClassDeclaration(
      node,
      removeFactoryConstructorDecorator(node.decorators),
      node.modifiers,
      node.name,
      node.typeParameters,
      node.heritageClauses,
      node.members
    );
  }
  return node;
}

function applyFactoryConstructorDecoratorVisitor(factory, node, shared) {
  if (isRelevantClassDeclaration(node, shared)) {
    const members = node.members.map(member => {
      if (ts.isConstructorDeclaration(member) && member.body) {
        const block = factory.updateBlock(member.body, [
          createRecallWithNewKeyword(factory, node.name, member.parameters),          
          ...member.body.statements
        ]);
        return factory.updateConstructorDeclaration(member, member.decorators, member.modifiers, member.parameters, block);
      }
      return member;
    });
    return factory.updateClassDeclaration(
      node,
      removeFactoryConstructorDecorator(node.decorators),
      node.modifiers,
      node.name,
      node.typeParameters,
      node.heritageClauses,
      members
    );
  }
  return node;
}

function hasFactoryConstructorDecorator(decorators) {
  return decorators?.some(isFactoryConstructorDecorator);
}

function removeFactoryConstructorDecorator(decorators) {
  const filtered = decorators?.filter(decorator => !isFactoryConstructorDecorator(decorator));
  if (filtered?.length > 0) {
    return filtered;
  }
}

function isFactoryConstructorDecorator(decorator) {
  return ts.isIdentifier(decorator.expression) && decorator.expression.escapedText === 'factoryConstructor';
}

function createRecallWithNewKeyword(factory, className, parameters) {
  return factory.createIfStatement(
    factory.createPrefixUnaryExpression(
      ts.SyntaxKind.ExclamationToken,
      factory.createParenthesizedExpression(factory.createBinaryExpression(
        factory.createThis(),
        factory.createToken(ts.SyntaxKind.InstanceOfKeyword),
        className
      ))
    ),
    factory.createBlock(
      [factory.createReturnStatement(factory.createNewExpression(
        className,
        undefined,
        parameters.map(parameter => parameter.name)
      ))],
      true
    ),
    undefined
  )
}

function visitor(factory, node, shared) {
  if (!isRelevantClassDeclaration(node, shared)) {
    return node;
  }
  return createNodeWithFactories(factory, node);
}

function isRelevantClassDeclaration(node, shared) {
  return ts.isClassDeclaration(node) && shared.classes.has(node.name.escapedText);
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
