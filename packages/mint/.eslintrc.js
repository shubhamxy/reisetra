module.exports = {
    extends: ['next/core-web-vitals', 'standard', 'prettier'],
    plugins: ['import', 'node', 'promise', 'unused-imports'],
    rules: {
        'react/no-children-prop': 0,
        'dot-notation': 'warn',
        'no-unused-vars': 'warn',
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'import/newline-after-import': 0,
        // 'function-paren-newline': 1,
    },
}
