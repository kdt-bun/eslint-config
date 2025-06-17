import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-sonarjs'

export const sonar = () => concat(plugin.configs.recommended, {
    rules: {
        'sonarjs/arguments-order': 'off',
        'sonarjs/assertions-in-tests': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/function-return-type': 'off',
        'sonarjs/hashing': 'off',
        'sonarjs/no-async-constructor': 'off',
        'sonarjs/no-clear-text-protocols': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-hardcoded-secrets': 'off',
        'sonarjs/no-invariant-returns': 'off',
        'sonarjs/no-nested-assignment': 'off',
        'sonarjs/no-nested-conditional': 'off',
        'sonarjs/no-nested-functions': 'off',
        'sonarjs/no-nested-template-literals': 'off',
        'sonarjs/no-os-command-from-path': 'off',
        'sonarjs/pseudo-random': 'off',
        'sonarjs/redundant-type-aliases': 'off',
        'sonarjs/todo-tag': 'off',
        'sonarjs/updated-loop-counter': 'off',
        'sonarjs/no-selector-parameter': 'off',
        'sonarjs/no-dead-store': 'off',
    },
})
