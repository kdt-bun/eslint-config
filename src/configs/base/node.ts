import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-n'

export const node = () => concat(plugin.configs['flat/recommended'], {
    rules: {
        'n/handle-callback-err': ['error', '^(err|error)$'],
        'n/hashbang': 'off',
        'n/no-missing-import': 'off',
        'n/no-missing-require': 'off',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/no-process-exit': 'off',
        'n/no-unpublished-import': 'off',
        'n/no-unpublished-require': 'off',
        'n/no-unsupported-features/node-builtins': 'off',
        'n/shebang': 'off',
    },
})
