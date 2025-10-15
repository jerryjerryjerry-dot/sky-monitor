const eslint = require('@eslint/js')
const globals = require('globals')
const reactHooks = require('eslint-plugin-react-hooks')
const reactRefresh = require('eslint-plugin-react-refresh')
const eslintPrettier = require('eslint-plugin-prettier')
const importSort = require('eslint-plugin-simple-import-sort')

const tseslint = require('typescript-eslint')

const ignores = [
    'dist',
    'build',
    'node_modules',
    '**/*.js',
    '**/*.mjs',
    '**/*.d.ts',
    '**/*.map',
    'eslint.config.js',
    'commitlint.config.js',
    '**/vite.config.ts',
    '**/tailwind.config.js',
    '**/postcss.config.js',
    'apps/frontend/monitor/src/components/ui/**/*',
    'packages/browser-utils/src/metrics/**/*',
    'sql/**/*',
    '.devcontainer/**/*',
    'doc/**/*',
]

const frontendMonitorConfig = {
    files: ['apps/frontend/monitor/**/*.{ts,tsx}'],
    ignores: ['apps/frontend/monitor/src/components/ui/**/*'],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'no-console': 'error',
    },
}

const backendMonitorConfig = {
    files: ['apps/backend/**/*.ts'],
    ignores: ['apps/backend/**/dist/**/*', 'apps/backend/**/node_modules/**/*'],
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },
        parser: tseslint.parser,
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // 后端允许使用 console（用于日志输出）
        'no-console': 'off',
    },
}

module.exports = tseslint.config(
    {
        ignores,
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
        plugins: {
            prettier: eslintPrettier,
            'simple-import-sort': importSort,
        },
        rules: {
            // 临时关闭以规避 @typescript-eslint 与 ESLint 版本/配置不匹配导致的崩溃
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            // Prettier 格式问题降级为警告（不阻塞开发）
            'prettier/prettier': 'warn',
            'simple-import-sort/imports': 'error',
        },
    },
    frontendMonitorConfig,
    backendMonitorConfig
)
