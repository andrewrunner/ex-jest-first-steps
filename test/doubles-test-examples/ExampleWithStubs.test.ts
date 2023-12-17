import { calculateComplexity } from "../../src/lib/StringUtils"

describe("Using tests with stubs", () => {

    it("Calculate complexity", () => {

        // create stub with required fields 
        const someInfo = {
            length: 5,
            extraInfo: {
                field1: 'Info 1',
                field2: 'Info 2',
            }
        };

        const actual = calculateComplexity(someInfo as any);

        expect(actual).toBe(10);
    })
})