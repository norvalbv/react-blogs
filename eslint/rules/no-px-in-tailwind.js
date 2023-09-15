// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow usage of `px` in arbitrary Tailwind CSS class names',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create: function (context) {
    return {
      Literal(node) {
        const value = node.value;
        const regex = /(\d+)px/;
        if (typeof value === 'string' && value.match(regex)) {
          context.report({
            node,
            message: 'Usage of `px` is not allowed in arbitrary Tailwind CSS class names',
          });
        }
      },
    };
  },
};
