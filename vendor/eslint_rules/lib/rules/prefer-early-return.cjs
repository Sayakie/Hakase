// Copy-paste from the following file:
// https://github.com/Shopify/web-configs/blob/41f67f9b14847471d20d5615dee8522b8a87cf23/packages/eslint-plugin/lib/rules/prefer-early-return.js

const uri = `https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/prefer-early-return.md`
const defaultMaximumStatements = 1;

module.exports = {
  meta: {
    docs: {
      description:
        'Prefer early returns over full-body conditional wrapping in function declarations.',
      category: 'Best Practices',
      recommended: false,
      uri,
    },
    schema: [
      {
        type: 'object',
        properties: {
          maximumStatements: {
            type: 'integer',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {
      maximumStatements: defaultMaximumStatements,
    };
    const maxStatements = options.maximumStatements;

    function isLonelyIfStatement(statement) {
      return statement.type === 'IfStatement' && statement.alternate == null;
    }

    function isOffendingConsequent(consequent) {
      return (
        (consequent.type === 'ExpressionStatement' && maxStatements === 0) ||
        (consequent.type === 'BlockStatement' &&
          consequent.body.length > maxStatements)
      );
    }

    function isOffendingIfStatement(statement) {
      return (
        isLonelyIfStatement(statement) &&
        isOffendingConsequent(statement.consequent)
      );
    }

    function hasSimplifiableConditionalBody(functionBody) {
      const body = functionBody.body;
      return (
        functionBody.type === 'BlockStatement' &&
        body.length === 1 &&
        isOffendingIfStatement(body[0])
      );
    }

    function checkFunctionBody(functionNode) {
      const body = functionNode.body;

      if (hasSimplifiableConditionalBody(body)) {
        context.report(
          body,
          'Prefer an early return to a conditionally-wrapped function body',
        );
      }
    }

    return {
      FunctionDeclaration: checkFunctionBody,
      FunctionExpression: checkFunctionBody,
      ArrowFunctionExpression: checkFunctionBody,
    };
  },
};
