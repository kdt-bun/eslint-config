import { concat } from 'eslint-flat-config-utils'
import { kdtPlugin } from '../../plugins'

export const kdt = () => concat({
    plugins: {
        kdt: kdtPlugin,
    },
    rules: {
        'kdt/arrow-empty-body-newline': 'error',
        'kdt/import-single-line': 'error',
        'kdt/object-curly-newline': 'error',
        '@stylistic/object-curly-newline': 'off',
    },
})
