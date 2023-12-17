import { OtherStringUtils } from "../../src/lib/StringUtils";

describe("Using tests with spies", () => { 

    describe("OtherStringUtils test with spies", () => { 

        let sut: OtherStringUtils;

        beforeEach(() => {
            sut = new OtherStringUtils();
        });


        test('Use a spy to track calls', () => {

            const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
            sut.toUpperCase('qwerty');

            expect(toUpperCaseSpy).toHaveBeenCalledWith('qwerty');
        })


        test('Use a spy to track calls to other modules', () => {

            const consoleLogSpy = jest.spyOn(console, 'log');
            sut.logString('abc');

            expect(consoleLogSpy).toHaveBeenCalledWith('abc');
        })


        test('Use a spy to replace the implementation of a method', () => {

            // as any - se for track of private 
            jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
                console.log("Caling replaced implementation...")
            });

            (sut as any).callExternalService();

            // but this is bat methos. Use for extra situatins...
        })

    });
});