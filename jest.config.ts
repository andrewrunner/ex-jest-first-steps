
import type { Config } from '@jest/types';

const config:Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [ 
        "<rootDir>/src/**/*.ts" 
    ],
    testMatch: [ 
        "<rootDir>/test/integration-test/**/*test.ts" 
    ],
    setupFiles: [ 
        "<rootDir>/test/integration-test/utils/config.ts", // load specify config for tests 
    ], 
}

export default config;