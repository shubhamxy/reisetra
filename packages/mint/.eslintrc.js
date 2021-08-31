module.exports = {
    extends: ['next/core-web-vitals', 'standard', 'prettier'],
    plugins: ['import', 'node', 'promise', 'unused-imports'],
    rules: {
        'react/no-children-prop': 0,
        'dot-notation': 0,
        'no-unused-vars': 0,
        'unused-imports/no-unused-imports': 0,
        'unused-imports/no-unused-vars': [
            0,
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
