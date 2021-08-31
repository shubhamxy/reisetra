module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './',
    modulePaths: ['<rootDir>'],
    testEnvironment: 'node',
    testRegex: '\\.(spec|test).ts',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    setupFiles: ['dotenv/config'],
}
