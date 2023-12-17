import { toUpperCaseWithCb } from "../../src/lib/StringUtils";


describe("Using tests with mocks", () => { 


    describe("Tracking callbacks", () => {
        
        let cdArgs = [];
        let timesCalled = 0;

        function callbackMock(arg:string) {
            cdArgs.push(arg);
            timesCalled++;
        }

        afterEach(() => {
            // if not, second test will fail (will expect 1, but have 2, because toUpperCaseWithCb called twice)
            cdArgs = [];
            timesCalled = 0;
        })

        it("toUpperCaseWithCb - calls acllback for invalid args with tracking calls", () => {
            const actual = toUpperCaseWithCb('', callbackMock);
            expect(actual).toBeUndefined();
            expect(cdArgs).toContain("Invalid string!");
            expect(timesCalled).toBe(1);
        });
    
        it("toUpperCaseWithCb - calls acllback for valid args with tracking calls", () => {
            const actual = toUpperCaseWithCb('abc', callbackMock);
            expect(actual).toBe('ABC');
            expect(cdArgs).toContain("Called function with abc");
            expect(timesCalled).toBe(1);
        });
    });


    describe("Tracking callbacks with Jest mocks", () => { 

        const callbackMock = jest.fn();

        afterEach(() => {
           jest.clearAllMocks();
        })

        it("toUpperCaseWithCb - calls acllback for invalid args with tracking calls", () => {
            const actual = toUpperCaseWithCb('', callbackMock);
            expect(actual).toBeUndefined();
            expect(callbackMock).toHaveBeenCalledWith("Invalid string!");
            expect(callbackMock).toHaveBeenCalledTimes(1);
        });
    
        it("toUpperCaseWithCb - calls acllback for valid args with tracking calls", () => {
            const actual = toUpperCaseWithCb('abc', callbackMock);
            expect(actual).toBe('ABC');
            expect(callbackMock).toHaveBeenCalledWith("Called function with abc");
            expect(callbackMock).toHaveBeenCalledTimes(1);
        });
    });



});