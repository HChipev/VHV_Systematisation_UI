import typescriptEslint from '@typescript-eslint/eslint-plugin'
import reactRefresh from 'eslint-plugin-react-refresh'
import typescriptParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import globals from 'globals'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import vitestGlobals from 'eslint-plugin-vitest-globals'

export default [
  {
    ...reactRecommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ignores: ['eslint.config.js'],
    languageOptions: {
      ...reactRecommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json', './tsconfig.node.json'], // Specify it only for TypeScript files
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...vitestGlobals.environments.env.globals,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-await-in-loop': 'error',
      'no-duplicate-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*'],
        },
      ],
      'no-redeclare': 'error',
      'no-constant-binary-expression': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable-loop': 'error',
      'no-unused-private-class-members': 'error',
      'no-use-before-define': 'error',
      'require-atomic-updates': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      camelcase: 'error',
      'consistent-return': 'error',
      curly: 'error',
      'default-case': 'error',
      'default-param-last': 'error',
      eqeqeq: 'error',
      'no-console': 'error',
      'no-continue': 'error',
      'no-else-return': 'error',
      'react/jsx-uses-vars': 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      'no-implicit-coercion': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-negated-condition': 'warn',
      'no-nested-ternary': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-sequences': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-throw-literal': 'off',
      'no-undef-init': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      'object-shorthand': 'warn',
      'prefer-arrow-callback': 'warn',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: true,
        },
      ],
      'no-restricted-exports': [
        'error',
        { restrictDefaultExports: { direct: true } },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/hook-use-state': ['error', { allowDestructuredState: false }],
      'react/jsx-pascal-case': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/boolean-prop-naming': [
        'error',
        {
          propTypeNames: ['boolean'],
          validateNested: true,
          rule: '^(is|has|can|should|will|did|are)[A-Z]([A-Za-z0-9]?)+',
          message:
            'Variable name `{{ propName }}` must have one of the following prefixes: is, has, can, should, will, did, are',
        },
      ],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/jsx-newline': [
        'error',
        {
          prevent: false,
        },
      ],
      'max-params': ['error', 4],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'can', 'should', 'will', 'did', 'are'],
        },
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
    },
  },
]
