import type { Linter } from 'eslint'
import { notNullish } from '@kdt-bun/utils'
import typescriptParser from '@typescript-eslint/parser'
import { concat } from 'eslint-flat-config-utils'
import { mergeProcessors } from 'eslint-merge-processors'
import plugin from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import processorVueBlocks from 'eslint-processor-vue-blocks'
import vueParser from 'vue-eslint-parser'
import { stylistic } from '../base'

export async function getStylisticRules() {
    const stylisticRules: Linter.RulesRecord = {}
    const stylisticConfigs = await stylistic()

    for (const config of stylisticConfigs) {
        if (config.rules) {
            for (const [ruleName, ruleOptions] of Object.entries(config.rules)) {
                if (notNullish(ruleOptions)) {
                    const name = ruleName.startsWith('@stylistic/') ? ruleName.replace('@stylistic/', '') : ruleName

                    if (name in plugin.rules) {
                        stylisticRules[`vue/${name}`] = ruleOptions
                    }
                }
            }
        }
    }

    return stylisticRules
}

const processor = mergeProcessors([
    plugin.processors['.vue'],
    processorVueBlocks({ blocks: { styles: true, customBlocks: true } }),
])

export const vue = async () => concat(
    plugin.configs['flat/base'],
    plugin.configs['flat/essential'],
    plugin.configs['flat/strongly-recommended'],
    plugin.configs['flat/recommended'],
    pluginVueA11y.configs['flat/recommended'],
    {
        files: ['**/*.vue'],
        processor,
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: typescriptParser,
                extraFileExtensions: ['.vue'],
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            ...(await getStylisticRules()),
            '@stylistic/indent': 'off',
            'vue/block-lang': ['error', { script: { lang: 'ts' } }],
            'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
            'vue/block-tag-newline': ['error', { maxEmptyLines: 1, multiline: 'always', singleline: 'consistent' }],
            'vue/component-api-style': ['error', ['script-setup', 'composition']],
            'vue/component-name-in-template-casing': 'error',
            'vue/component-options-name-casing': 'error',
            'vue/custom-event-name-casing': ['error', 'kebab-case'],
            'vue/define-emits-declaration': 'error',
            'vue/define-macros-order': ['error', { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] }],
            'vue/define-props-declaration': 'error',
            'vue/html-button-has-type': 'error',
            'vue/html-closing-bracket-newline': ['error', { multiline: 'always', singleline: 'never' }],
            'vue/html-comment-content-newline': 'error',
            'vue/html-comment-content-spacing': 'error',
            'vue/html-comment-indent': ['error', 4],
            'vue/html-indent': ['error', 4],
            'vue/html-quotes': ['error', 'double'],
            'vue/match-component-file-name': ['error', { extensions: ['.jsx', '.tsx', '.vue'] }],
            'vue/match-component-import-name': 'error',
            'vue/max-attributes-per-line': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/next-tick-style': 'error',
            'vue/no-deprecated-model-definition': ['error', { allowVue3Compat: true }],
            'vue/no-duplicate-attr-inheritance': 'off',
            'vue/no-empty-component-block': 'error',
            'vue/no-extra-parens': ['error', 'functions'],
            'vue/no-multiple-objects-in-class': 'error',
            'vue/no-potential-component-option-typo': ['error', { presets: ['all'] }],
            'vue/no-ref-object-reactivity-loss': 'error',
            'vue/no-required-prop-with-default': ['error', { autofix: true }],
            'vue/no-restricted-v-bind': ['error', '/^v-/'],
            'vue/no-setup-props-reactivity-loss': 'off',
            'vue/no-this-in-before-route-enter': 'error',
            'vue/no-unsupported-features': ['error', { version: '>=3.4.0' }],
            'vue/no-unused-refs': 'error',
            'vue/no-unused-vars': 'error',
            'vue/no-useless-mustaches': 'error',
            'vue/no-useless-v-bind': 'error',
            'vue/no-v-html': 'off',
            'vue/padding-line-between-blocks': 'error',
            'vue/padding-lines-in-component-definition': 'error',
            'vue/prefer-define-options': 'error',
            'vue/prefer-prop-type-boolean-first': 'error',
            'vue/prefer-separate-static-class': 'error',
            'vue/prefer-true-attribute-shorthand': 'error',
            'vue/require-default-prop': 'off',
            'vue/require-direct-export': 'error',
            'vue/require-emit-validator': 'error',
            'vue/require-macro-variable-name': 'error',
            'vue/require-name-property': 'error',
            'vue/require-typed-object-prop': 'error',
            'vue/require-typed-ref': 'error',
            'vue/script-indent': ['error', 4, { baseIndent: 1, switchCase: 1 }],
            'vue/singleline-html-element-content-newline': 'off',
            'vue/v-for-delimiter-style': 'error',
            'vue/valid-define-options': 'error',
            'vue/valid-v-bind': 'off',
        },
    },
)
