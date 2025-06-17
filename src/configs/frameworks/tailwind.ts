import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-better-tailwindcss'

export const DEFAULT_TAILWIND_ENTRY_POINT = 'src/styles/main.css'

export const DEFAULT_TAILWIND_CONFIG = 'tailwind.config.ts'

export interface TailwindOptions {
    entryPoint?: string
    tailwindConfig?: string
    attributes?: string[]
    callees?: string[]
    variables?: string[]
    tags?: string[]
}

export const tailwind = ({ entryPoint = DEFAULT_TAILWIND_ENTRY_POINT, tailwindConfig = DEFAULT_TAILWIND_CONFIG, ...options }: TailwindOptions = {}) => concat({
    plugins: {
        'better-tailwindcss': plugin,
    },
    settings: {
        'better-tailwindcss': { entryPoint, tailwindConfig, ...options },
    },
    rules: {
        ...plugin.configs['recommended-error'].rules,
        'better-tailwindcss/multiline': 'off',
        'better-tailwindcss/no-unregistered-classes': 'off',
    },
})
