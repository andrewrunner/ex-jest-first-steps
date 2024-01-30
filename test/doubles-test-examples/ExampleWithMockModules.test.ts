
jest.mock('../../src/lib/StringUtils', () => ({
    ...jest.requireActual("../../src/lib/StringUtils"), // add all functions from dodule 
    calculateComplexity: () => 10,                      // override calculateComplexity function
}));

jest.mock('uuid', () => ({
    v4: () => '123' // uuid.v4() will be return '123' in this test
}))

import * as StringUtils from '../../src/lib/StringUtils';


describe("Module tests", () => {

    test("calc complexity", () => {
        const res = StringUtils.calculateComplexity({} as any);
        expect(res).toBe(10);
    });

    test("keep other functions", () => {
        const res = StringUtils.toLowerCaseWithId("ABC");
        expect(res).toBe("abc123"); // id === 123 - because we mock it 
    });

});