import type { Linter } from 'eslint'
import { concat } from 'eslint-flat-config-utils'
import { importX as plugin } from 'eslint-plugin-import-x'

const pluginConfigs = [plugin.flatConfigs.recommended, plugin.flatConfigs.typescript] as Linter.Config[]

export const importX = () => concat(
    ...pluginConfigs,
    {
        rules: {
            'import-x/first': 'error',
            'import-x/newline-after-import': ['error', { considerComments: true, count: 1 }],
            'import-x/no-duplicates': 'error',
            'import-x/no-empty-named-blocks': 'error',
            'import-x/no-mutable-exports': 'error',
            'import-x/no-named-as-default': 'off',
            'import-x/no-named-as-default-member': 'off',
            'import-x/no-named-default': 'error',
            'import-x/no-self-import': 'error',
            'import-x/no-unresolved': 'off',
            'import-x/no-unused-modules': 'error',
            'import-x/no-useless-path-segments': 'error',
            'import-x/no-webpack-loader-syntax': 'error',
            'import-x/order': 'error',
        },
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            'import-x/no-duplicates': 'off',
        },
    },
)
