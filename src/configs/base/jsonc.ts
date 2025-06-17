import type { Linter } from 'eslint'
import { concat } from 'eslint-flat-config-utils'
import plugin from 'eslint-plugin-jsonc'

export const jsonc = () => concat(
    plugin.configs['flat/recommended-with-json'] as Linter.Config,
    plugin.configs['flat/recommended-with-json5'],
    plugin.configs['flat/recommended-with-jsonc'],
    {
        rules: {
            'jsonc/comma-dangle': ['error', 'never'],
            'jsonc/quotes': ['error', 'double'],
        },
    },
    {
        files: ['**/package.json'],
        rules: {
            'jsonc/sort-array-values': ['error', { order: { type: 'asc' }, pathPattern: '^files$' }],
            'jsonc/sort-keys': ['error', { order: ['publisher', 'name', 'displayName', 'type', 'version', 'private', 'packageManager', 'description', 'author', 'license', 'man', 'directories', 'funding', 'homepage', 'repository', 'bugs', 'keywords', 'os', 'cpu', 'categories', 'sideEffects', 'exports', 'main', 'module', 'unpkg', 'jsdelivr', 'types', 'typesVersions', 'bin', 'icon', 'files', 'engines', 'workspaces', 'volta', 'activationEvents', 'contributes', 'scripts', 'peerDependencies', 'peerDependenciesMeta', 'dependencies', 'optionalDependencies', 'devDependencies', 'bundledDependencies', 'dependenciesMeta', 'pnpm', 'publishConfig', 'config', 'overrides', 'resolutions', 'husky', 'simple-git-hooks', 'lint-staged', 'eslintConfig', 'preferGlobal'], pathPattern: '^$' }, { order: { type: 'asc' }, pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$' }, { order: { type: 'asc' }, pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$' }, { order: ['types', 'import', 'require', 'default'], pathPattern: '^exports.*$' }],
        },
    },
    {
        files: ['**/tsconfig.json', '**/tsconfig.*.json'],
        rules: {
            'jsonc/sort-keys': ['error', { order: ['extends', 'compilerOptions', 'compileOnSave', 'watchOptions', 'buildOptions', 'references', 'files', 'include', 'exclude', 'ts-node'], pathPattern: '^$' }, { order: ['incremental', 'composite', 'tsBuildInfoFile', 'disableSourceOfProjectReferenceRedirect', 'disableSolutionSearching', 'disableReferencedProjectLoad', 'target', 'jsx', 'jsxFactory', 'jsxFragmentFactory', 'jsxImportSource', 'lib', 'moduleDetection', 'noLib', 'reactNamespace', 'useDefineForClassFields', 'emitDecoratorMetadata', 'experimentalDecorators', 'baseUrl', 'rootDir', 'rootDirs', 'customConditions', 'module', 'moduleResolution', 'moduleSuffixes', 'noResolve', 'paths', 'resolveJsonModule', 'resolvePackageJsonExports', 'resolvePackageJsonImports', 'typeRoots', 'types', 'allowArbitraryExtensions', 'allowImportingTsExtensions', 'allowUmdGlobalAccess', 'ignoreDeprecations', 'allowJs', 'checkJs', 'maxNodeModuleJsDepth', 'strict', 'strictBindCallApply', 'strictFunctionTypes', 'strictNullChecks', 'strictPropertyInitialization', 'allowUnreachableCode', 'allowUnusedLabels', 'alwaysStrict', 'exactOptionalPropertyTypes', 'noFallthroughCasesInSwitch', 'noImplicitAny', 'noImplicitOverride', 'noImplicitReturns', 'noImplicitThis', 'noPropertyAccessFromIndexSignature', 'noUncheckedIndexedAccess', 'noUnusedLocals', 'noUnusedParameters', 'useUnknownInCatchVariables', 'declaration', 'declarationDir', 'declarationMap', 'downlevelIteration', 'emitBOM', 'emitDeclarationOnly', 'importHelpers', 'importsNotUsedAsValues', 'inlineSourceMap', 'inlineSources', 'mapRoot', 'newLine', 'noEmit', 'noEmitHelpers', 'noEmitOnError', 'outDir', 'outFile', 'preserveConstEnums', 'preserveValueImports', 'removeComments', 'sourceMap', 'sourceRoot', 'stripInternal', 'allowSyntheticDefaultImports', 'esModuleInterop', 'forceConsistentCasingInFileNames', 'isolatedModules', 'preserveSymlinks', 'verbatimModuleSyntax', 'skipDefaultLibCheck', 'skipLibCheck'], pathPattern: '^compilerOptions$' }],
        },
    },
)
