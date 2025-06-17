import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-promise'

export const promise = () => concat(plugin.configs['flat/recommended'], {
    rules: {
        'promise/always-return': 'off',
        'promise/catch-or-return': 'off',
        'promise/no-multiple-resolved': 'error',
        'promise/no-nesting': 'off',
        'promise/no-promise-in-callback': 'off',
    },
})
