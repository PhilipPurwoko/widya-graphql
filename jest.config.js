module.exports = {
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [151001]
            }
        }
    },
    roots: [
        '<rootDir>'
    ],
    testMatch: [
        '**/test/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
}
