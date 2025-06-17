import type { Linter } from 'eslint'
import { concat } from 'eslint-flat-config-utils'
import tseslint from 'typescript-eslint'

const rules: Linter.RulesRecord = {
    'no-use-before-define': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_', caughtErrors: 'all', caughtErrorsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/unified-signatures': 'off',
}

const typeCheckedRules: Linter.RulesRecord = {
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-deprecated': 'error',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowBoolean: true, allowAny: true, allowNullish: true, allowRegExp: true, allowNever: true }],
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/prefer-promise-reject-errors': 'off',
    '@typescript-eslint/only-throw-error': 'off',
}

const pluginConfigs = [tseslint.configs.eslintRecommended, tseslint.configs.strict, tseslint.configs.stylistic] as Linter.Config[][]
const pluginTypeCheckedConfigs = [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked] as Linter.Config[][]

export interface TypescriptLanguageOptions {
    tsconfigPath?: string | string[]
    tsconfigRootDir?: string
}

const languageOptions = ({ tsconfigPath, tsconfigRootDir }: TypescriptLanguageOptions) => ({
    parserOptions: {
        project: tsconfigPath,
        tsconfigRootDir,
        projectService: true,
    },
})

const declareFilesConfig: Linter.Config = {
    files: ['**/*.d.ts'],
    rules: {
        'no-restricted-syntax': 'off',
    },
}

const jsFilesConfig: Linter.Config = {
    files: ['**/*.js', '**/*.cjs'],
    rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
}

export interface TypescriptOptions {
    componentExts?: string[]
    tsconfig?: TypescriptLanguageOptions
}

export function typescript({ componentExts = [], tsconfig = { tsconfigPath: 'tsconfig.json', tsconfigRootDir: process.cwd() } }: TypescriptOptions = {}): Promise<Linter.Config[]> {
    const files = ['**/*.?([cm])[jt]s?(x)', ...componentExts.map((ext) => `**/*.${ext}`)]
    const baseConfigs = [declareFilesConfig, jsFilesConfig]

    baseConfigs.push({
        files,
        languageOptions: {
            parserOptions: {
                extraFileExtensions: componentExts.map((ext) => `.${ext}`),
                sourceType: 'module',
                warnOnUnsupportedTypeScriptVersion: false,
            },
        },
    })

    let configs: Promise<Linter.Config[]>

    if (tsconfig) {
        configs = concat(...pluginTypeCheckedConfigs, { languageOptions: languageOptions(tsconfig) }, { rules: { ...rules, ...typeCheckedRules } }, ...baseConfigs)
    } else {
        configs = concat(...pluginConfigs, { rules }, ...baseConfigs)
    }

    return configs.then((c) => c.map((config) => ({ ...config, files })))
}
