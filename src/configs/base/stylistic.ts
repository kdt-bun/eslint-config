import type { Linter } from 'eslint'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { concat } from 'eslint-flat-config-utils'

const commaDangleConfig = {
    arrays: 'always-multiline',
    exports: 'never',
    functions: 'always-multiline',
    imports: 'never',
    objects: 'always-multiline',
    enums: 'always-multiline',
    generics: 'never',
    tuples: 'never',
}

const linesAroundCommentConfig = {
    allowArrayStart: true,
    allowBlockStart: true,
    allowClassStart: true,
    allowObjectStart: true,
    beforeBlockComment: true,
    beforeLineComment: true,
}

const paddingLineBetweenStatementsConfig = [
    { blankLine: 'never', next: ['break', 'default'], prev: '*' },
    { blankLine: 'never', next: '*', prev: ['break', 'case', 'default'] },
    { blankLine: 'never', next: 'case', prev: 'switch' },
    { blankLine: 'always', next: 'interface', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'interface' },
    { blankLine: 'always', next: 'class', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'class' },
    { blankLine: 'always', next: '*', prev: 'directive' },
    { blankLine: 'always', next: '*', prev: ['do', 'for', 'while'] },
    { blankLine: 'always', next: ['do', 'for', 'while'], prev: '*' },
    { blankLine: 'always', next: '*', prev: 'function' },
    { blankLine: 'always', next: 'function', prev: 'directive' },
    { blankLine: 'always', next: '*', prev: 'if' },
    { blankLine: 'always', next: 'if', prev: '*' },
    { blankLine: 'always', next: '*', prev: ['multiline-block-like', 'multiline-expression'] },
    { blankLine: 'always', next: ['multiline-block-like', 'multiline-expression'], prev: '*' },
    { blankLine: 'always', next: '*', prev: ['multiline-const', 'multiline-let', 'multiline-var'] },
    { blankLine: 'always', next: ['multiline-const', 'multiline-let', 'multiline-var'], prev: '*' },
    { blankLine: 'always', next: 'return', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'switch' },
    { blankLine: 'always', next: 'switch', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'try' },
    { blankLine: 'always', next: 'try', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'with' },
    { blankLine: 'always', next: 'with', prev: '*' },
]

const plugin = stylisticPlugin.configs.customize({
    indent: 4,
    arrowParens: true,
    braceStyle: '1tbs',
    quoteProps: 'consistent',
})

let configs: Promise<Linter.Config[]> | undefined

export const stylistic = () => configs ??= concat(stylisticPlugin.configs['disable-legacy'], plugin, {
    rules: {
        '@stylistic/array-bracket-newline': ['error', 'consistent'],
        '@stylistic/array-element-newline': ['error', 'consistent'],
        '@stylistic/comma-dangle': ['error', commaDangleConfig],
        '@stylistic/func-call-spacing': 'error',
        '@stylistic/function-call-argument-newline': ['error', 'consistent'],
        '@stylistic/function-call-spacing': 'error',
        '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
        '@stylistic/generator-star-spacing': ['error', 'both'],
        '@stylistic/implicit-arrow-linebreak': 'error',
        '@stylistic/jsx-child-element-spacing': 'off',
        '@stylistic/jsx-newline': 'off',
        '@stylistic/jsx-props-no-multi-spaces': 'off',
        '@stylistic/jsx-quotes': ['error', 'prefer-double'],
        '@stylistic/jsx-self-closing-comp': 'off',
        '@stylistic/jsx-sort-props': 'off',
        '@stylistic/linebreak-style': ['error', 'unix'],
        '@stylistic/lines-around-comment': ['error', linesAroundCommentConfig],
        '@stylistic/multiline-ternary': ['error', 'never'],
        '@stylistic/newline-per-chained-call': 'off',
        '@stylistic/no-confusing-arrow': 'error',
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/nonblock-statement-body-position': ['error', 'below'],
        '@stylistic/object-curly-newline': ['error', { consistent: true, multiline: true }],
        '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        '@stylistic/one-var-declaration-per-line': 'off',
        '@stylistic/operator-linebreak': ['error', 'after'],
        '@stylistic/padding-line-between-statements': ['error', ...paddingLineBetweenStatementsConfig],
        '@stylistic/semi-style': 'error',
        '@stylistic/switch-colon-spacing': 'error',
        '@stylistic/wrap-regex': 'off',
        '@stylistic/max-len': 'off',
    },
})
