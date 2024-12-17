module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/jest/**/*.test.js'], // Limite aux tests dans `jest/`
    collectCoverage: true,
    coverageDirectory: './coverage',
    coverageReporters: ["json-summary"]
};
