import type { Linter } from 'eslint'
import { resolveOptions } from '@kdt-bun/utils'
import { composer } from 'eslint-flat-config-utils'
import { antfu, comments, format, type FormatOptions, gitignore, ignores, importX, javascript, jsonc, kdt, node, perfectionist, promise, regexp, sonar, stylistic, tailwind, type TailwindOptions, typescript, type TypescriptOptions, unicorn, unusedImports, vue } from './configs'

export interface DefineConfigOptions {
    tailwind?: TailwindOptions | boolean
    typescript?: TypescriptOptions
    format?: FormatOptions
    vue?: boolean
    node?: boolean
    config?: Linter.Config
    configs?: Linter.Config[]
}

export function defineConfig({ tailwind: tailwind_ = false, typescript: typescriptOptions = {}, format: formatOptions, vue: isVueEnabled = false, node: isNodeEnabled = false, config, configs: configs_ }: DefineConfigOptions = {}) {
    typescriptOptions.componentExts ??= []

    if (isVueEnabled) {
        typescriptOptions.componentExts.push('vue')
    }

    const configs = composer(ignores(), gitignore(), javascript(), typescript(typescriptOptions), stylistic(), comments(), importX(), jsonc(), promise(), regexp(), unusedImports(), antfu(), kdt(), format(formatOptions), perfectionist(), sonar(), unicorn())

    if (isVueEnabled) {
        configs.append(vue())
    }

    if (isNodeEnabled) {
        configs.append(node())
    }

    const tailwindOptions = resolveOptions(tailwind_)

    if (tailwindOptions !== false) {
        configs.append(tailwind(tailwindOptions))
    }

    if (config) {
        configs.append(config)
    }

    if (configs_) {
        configs.append(configs_)
    }

    return configs
}
