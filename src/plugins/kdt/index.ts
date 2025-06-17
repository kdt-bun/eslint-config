import type { ESLint, Linter } from 'eslint'
import { version } from '../../../package.json'
import { arrowEmptyBodyNewline, importSingleLine, objectCurlyNewline } from './rules'

const plugin = {
    meta: {
        name: 'kdt',
        version,
    },
    rules: {
        'arrow-empty-body-newline': arrowEmptyBodyNewline,
        'import-single-line': importSingleLine,
        'object-curly-newline': objectCurlyNewline,
    },
} satisfies ESLint.Plugin

export default plugin

type RuleDefinitions = typeof plugin['rules']

export type KDTRuleOptions = {
    [K in keyof RuleDefinitions]: RuleDefinitions[K]['defaultOptions']
}

export type KDTRules = {
    [K in keyof KDTRuleOptions]: Linter.RuleEntry<KDTRuleOptions[K]>
}
