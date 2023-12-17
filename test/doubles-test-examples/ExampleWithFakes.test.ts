import { toUpperCaseWithCb } from "../../src/lib/StringUtils";


describe("Using tests with fakes", () => { 

    // We don't know is callback was called and how mutch it was called
    // To fix that we would use callback mock in next example test
    it("toUpperCaseWithCb - calls acllback for invalid args", () => {
        const actual = toUpperCaseWithCb('', () => {});
        expect(actual).toBeUndefined();
    });

    it("toUpperCaseWithCb - calls acllback for valid args", () => {
        const actual = toUpperCaseWithCb('abc', () => {});
        expect(actual).toBe('ABC');
    });

});