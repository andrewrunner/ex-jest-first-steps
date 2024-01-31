
import type { Config } from '@jest/types';

const config:Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    // collectCoverageFrom: [ 
    //     "<rootDir>/src/**/*.ts" 
    // ],
    testMatch: [ 
        "<rootDir>/test/auth-unit-test/**/*test.ts",
        "<rootDir>/test/event-based-unit-test/**/*test.ts", 
        "<rootDir>/test/unit-test-examples/**/*test.ts", 
        "!<rootDir>/test/server-test/**/*test.ts", // example how to skip test folder
    ],
}

export default config;