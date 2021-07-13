module.exports = {
    moduleDirectories: ["./dependencies/nodejs/node_modules","./src"],
    moduleFileExtensions: ['ts', 'js', 'json'],
    testEnvironment: 'node',
    transform: {
        '.*.tsx?$': '<rootDir>/dependencies/nodejs/node_modules/ts-jest'
    },
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/src/prom.integration.test.ts'
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}