
import type { Config } from '@jest/types';

// const testMatch = "<rootDir>/src/**/*.ts";
const testMatch = "<rootDir>/test/event-based-unit-test/**/*.ts"

const config:Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [ testMatch ],
    testMatch: [ testMatch ]
}

export default config;