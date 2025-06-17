import configs from '@eslint-community/eslint-plugin-eslint-comments/configs'
import { concat } from 'eslint-flat-config-utils'

export const comments = () => concat(configs.recommended, {
    files: ['**/*.d.ts'],
    rules: {
        '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
    },
})
