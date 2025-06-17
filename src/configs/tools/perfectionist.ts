import type { Linter } from 'eslint'
import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-perfectionist'

export const perfectionist = () => concat(<Linter.Config>{
    plugins: {
        perfectionist: plugin,
    },
    rules: {
        'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-imports': ['error', { groups: ['type', ['parent-type', 'sibling-type', 'index-type', 'internal-type'], 'builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'side-effect', 'object', 'unknown'], newlinesBetween: 'ignore', order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
        'import-x/order': 'off',
        'sort-imports': 'off',
    },
})
