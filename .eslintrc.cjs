/**
 * @fileoverview Represents strategy config how ESLint linting.
 * @author Sayakie <sayakie@kakao.com>
 */

const [OFF, WARN, ERROR] = [0, 1, 2]
const [ALWAYS, NEVER] = [`always`, `never`]

/**
 * @typedef ESLintAdvancedLinterOptions
 * @property {'@typescript-eslint-parser'} parser
 * @property {import('@typescript-eslint/parser').ParserOptions} parserOptions
 *
 * @typedef {import('eslint/lib/shared/types').ConfigData} ESLintBaseLinterOptions
 * @typedef {ESLintBaseLinterOptions & ESLintAdvancedLinterOptions} ESLintOptions
 */

/** @type {ESLintOptions} */
module.exports = {
  env: {
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requring-type-checking',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: [`*.?({m,c})ts`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          ERROR,
          {
            allowExpressions: true,
            allowHigherOrderFunctions: false
          }
        ],
        '@typescript-eslint/explicit-member-accessibility': [ERROR],
        '@typescript-eslint/explicit-module-boundary-types': [
          ERROR,
          {
            allowArgumentsExplicitlyTypedAsAny: true
          }
        ]
      }
    }
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2022,
    extraFileExtensions: [`.cjs`, `.mjs`, `.cts`, `.mts`],
    project: `tsconfig.eslint.json`,
    sourceType: `module`,
    tsconfigRootDir: __dirname
  },
  plugins: [
    `@typescript-eslint`,
    `node`,
    `simple-import-sort`,
    `sort-keys-fix`,
    `import`,
    `prettier`,
    `prefer-early-return`
  ],
  root: true,
  rules: {
    '@typescript-eslint/array-type': [
      ERROR,
      {
        default: `array-simple`,
        readonly: `generic`
      }
    ],
    '@typescript-eslint/class-literal-property-style': [ERROR, `fields`],
    '@typescript-eslint/consistent-type-assertions': [ERROR],
    '@typescript-eslint/consistent-type-definitions': [ERROR, `interface`],
    '@typescript-eslint/consistent-type-imports': [
      ERROR,
      {
        disallowTypeAnnotations: false
      }
    ],
    '@typescript-eslint/explicit-function-return-type': [OFF],
    '@typescript-eslint/explicit-member-accessibility': [OFF],
    '@typescript-eslint/explicit-module-boundary-types': [OFF],
    '@typescript-eslint/member-delimiter-style': [
      ERROR,
      {
        multiline: {
          delimiter: `none`,
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/member-ordering': [ERROR],
    /** {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md Docs} */
    '@typescript-eslint/naming-convention': [
      ERROR,
      {
        format: [`camelCase`],
        selector: `default`
      },
      {
        format: [`camelCase`, `PascalCase`, `UPPER_CASE`],
        selector: `variable`
      },
      {
        format: [`camelCase`, `PascalCase`],
        selector: `enumMember`
      },
      {
        format: [`PascalCase`],
        prefix: [`is`, `should`, `has`, `can`, `did`, `will`],
        selector: `variable`,
        types: [`boolean`]
      },
      {
        format: [`camelCase`],
        leadingUnderscore: `allow`,
        selector: `parameter`
      },
      {
        format: [`camelCase`, `PascalCase`, `UPPER_CASE`],
        selector: `classProperty`
      },
      {
        format: [`StrictPascalCase`],
        selector: `typeLike`
      }
    ],

    '@typescript-eslint/no-base-to-string': [ERROR],
    '@typescript-eslint/no-confusing-non-null-assertion': [ERROR],
    '@typescript-eslint/no-confusing-void-expression': [
      ERROR,
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: true
      }
    ],
    '@typescript-eslint/no-dynamic-delete': [WARN],
    '@typescript-eslint/no-explicit-any': [WARN],
    '@typescript-eslint/no-extraneous-class': [
      ERROR,
      {
        allowStaticOnly: true
      }
    ],
    '@typescript-eslint/no-inferrable-types': [
      ERROR,
      {
        ignoreParameters: true
      }
    ],
    '@typescript-eslint/no-invalid-void-type': [ERROR],
    '@typescript-eslint/no-meaningless-void-operator': [ERROR],
    '@typescript-eslint/no-non-null-assertion': [OFF],
    // '@typescript-eslint/no-non-null-asserted-nullish-coalescing': [ERROR],
    '@typescript-eslint/no-require-imports': [ERROR],
    // '@typescript-eslint/no-type-alias': [
    //   ERROR,
    //   {
    //     allowAliases: 'in-unions-and-intersections',
    //     allowCallbacks: 'always',
    //     allowConditionalTypes: 'always',
    //     allowLiterals: 'in-unions-and-intersections',
    //     allowMappedTypes: 'in-unions-and-intersections',
    //     allowTupleTypes: 'in-unions',
    //     allowGenerics: 'always'
    //   }
    // ],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
      ERROR,
      {
        allowComparingNullableBooleansToFalse: false,
        allowComparingNullableBooleansToTrue: false
      }
    ],
    '@typescript-eslint/no-unnecessary-condition': [ERROR],
    '@typescript-eslint/prefer-readonly': [ERROR],
    'eslint-comments/no-use': [
      ERROR,
      {
        allow: [
          `eslint-disable`,
          `eslint-disable-line`,
          `eslint-disable-next-line`,
          `eslint-enable`
        ]
      }
    ],
    'import/exports-last': [ERROR],
    'import/first': [ERROR],
    'import/newline-after-import': [ERROR],
    'import/no-absolute-path': [ERROR],
    'import/no-amd': [ERROR],
    'import/no-commonjs': [ERROR],
    // 'import/no-default-export': [ERROR],
    'import/no-deprecated': [ERROR],
    'import/no-duplicates': [ERROR],
    // 'import/no-anonymous-default-export': [
    //   ERROR,
    //   {
    //     allowArray: true,
    //     allowArrayFunction: true,
    //     allowAnonymousFunction: true
    //   }
    // ],
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: false
      }
    ],
    'import/no-mutable-exports': [ERROR],
    // 'import/no-namespace': [WARN],
    // 'import/order': [ERROR, { 'newlines-between': 'always' }],
    'no-tabs': [ERROR, { allowIndentationTabs: false }],
    'node/no-missing-import': [OFF],
    'node/no-unpublished-import': [OFF],
    'node/no-unsupported-features/es-syntax': [OFF],
    'node/prefer-promises/dns': [ERROR],
    'node/prefer-promises/fs': [ERROR],
    'simple-import-sort/exports': [ERROR],
    'simple-import-sort/imports': [ERROR],
    'sort-keys-fix/sort-keys-fix': [ERROR, `asc`, { natural: true }],
    'prefer-early-return/prefer-early-return': [ERROR]
  }
}
