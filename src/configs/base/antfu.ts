import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-antfu'

export const antfu = () => concat([
    {
        plugins: {
            antfu: plugin,
        },
        rules: {
            'antfu/if-newline': 'error',
            'antfu/import-dedupe': 'error',
            'antfu/no-import-dist': 'error',
            'antfu/no-import-node-modules-by-path': 'error',
        },
    },
    {
        files: ['**/bin/**/*'],
        rules: {
            'antfu/no-import-dist': 'off',
            'antfu/no-import-node-modules-by-path': 'off',
        },
    },
])
