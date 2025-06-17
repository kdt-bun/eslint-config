import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-unused-imports'

export const unusedImports = () => concat(
    {
        plugins: {
            'unused-imports': plugin,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            'unused-imports/no-unused-vars': 'off',
        },
    },
)
