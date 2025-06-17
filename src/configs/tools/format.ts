import type { Linter } from 'eslint'
import type { Options } from 'prettier'
import { resolveOptions } from '@kdt-bun/utils'
import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-format'

const defaultPrettierOptions: Options = {
    arrowParens: 'always',
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'ignore',
    jsxSingleQuote: false,
    printWidth: Number.POSITIVE_INFINITY,
    quoteProps: 'consistent',
    semi: false,
    singleAttributePerLine: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    useTabs: false,
    vueIndentScriptAndStyle: true,
}

const getEslintConfig = (files: string[], prettierOptions: Options = {}): Linter.Config => ({
    files,
    languageOptions: {
        parser: plugin.parserPlain,
    },
    plugins: {
        format: plugin,
    },
    rules: {
        'format/prettier': ['error', { ...defaultPrettierOptions, ...prettierOptions }],
    },
})

export interface PrettierTailwindOptions {
    enabled?: boolean
    tailwindStylesheet?: string
    tailwindConfig?: string
    tailwindAttributes?: string[]
    tailwindFunctions?: string[]
    tailwindPreserveWhitespace?: boolean
    tailwindPreserveDuplicates?: boolean
}

export interface PrettierGetSupportedFilesOptions {
    tailwind?: PrettierTailwindOptions | boolean
}

const getSupportedFiles = ({ tailwind = false }: PrettierGetSupportedFilesOptions = {}): Array<[files: string[], options: Options]> => {
    const tailwindOptions = resolveOptions(tailwind) || { enabled: false }

    return [
        [['**/*.css'], { parser: 'css' }],
        [['**/*.{p,post}css'], { parser: 'css' }],
        [['**/*.scss'], { parser: 'scss' }],
        [['**/*.less'], { parser: 'less' }],
        [['**/*.md'], { parser: 'markdown' }],
        [['**/*.htm?(l)'], { parser: 'html', ...(tailwindOptions.enabled ? { plugins: ['eslint-plugin-tailwindcss'], ...tailwindOptions } : {}) }],
        [['**/*.y?(a)ml'], { parser: 'yaml' }],
    ]
}

export type FormatOptions = PrettierGetSupportedFilesOptions

export const format = (options: FormatOptions = {}) => concat(...getSupportedFiles(options).map(([files, prettierOptions]) => {
    return getEslintConfig(files, prettierOptions)
}))
