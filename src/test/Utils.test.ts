import StringUtils, { getStringInfo, toUpperCase } from "../lib/StringUtils";

describe('Utils test suite', () => {


    describe('StringUtils tests', () => {

        let sut: StringUtils;

        // HOOKS init mocks for all tests of this block =============

        // init all we need for each test in one place
        beforeEach(() => {
            sut = new StringUtils();
        });

        afterEach(() => {
            // clear all mocks 
        });

        // TESTS =====================================================

        it('Should return correct upperCase', () => {
            const actual = sut.toUpperCase('abc');
            expect(actual).toBe('ABC');
        })

        it('Should return error on invalid argument - function', () => {
            function exprecError() {
                sut.toUpperCase('');
            }

            expect(exprecError).toThrow();
            expect(exprecError).toThrow('Argument is empty!');
        })

        it('Should return error on invalid argument - arrow function', () => {
            expect(() => {
                sut.toUpperCase('')
            }).toThrow('Argument is empty!');
        })

        it('Should return error on invalid argument - try catch block', (done) => {
            try {
                sut.toUpperCase('');
                done('StringUtils.toUpperCase should throw error for invalid arg'); // если небыло выкинуто исключение 
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
                expect(e).toHaveProperty('message', 'Argument is empty!');
                done();
            }
        });

    })





    // each test has three common section: arrage, act, assert
    it('shoud return uppercase of valid string', () => {
        //arrange: 
        const sut = toUpperCase;
        const exprected = 'ABC';    

        //act:
        const actual = sut('abc'); // actual is result...

        //assert:
        expect(actual).toBe(exprected);
    });


    // array of different parameters to test
    describe('ToUpperCase examples', () => {

        it.each([
            { input:'abc', expected: 'ABC' },
            { input:'My-String', expected: 'MY-STRING' },
            { input:'def', expected: 'DEF' },
        ])('$input toUpperCase shoud be $expected', ({input, expected}) => {

            const actual = toUpperCase(input);
            expect(actual).toBe(expected);

        })

    })




    
    describe('getStringInfo for arg string-text shoult', () => {

        it('return right length', () => {
            const actual = getStringInfo('string-text');

            expect(actual.characters.length).toBe(11);
            expect(actual.characters).toHaveLength(11); // other vay for previous
        })

        it('return right lower case', () => {
            const actual = getStringInfo('string-text');
            expect(actual.lowerCase).toBe('string-text');
        })

        it('return right upper case', () => {
            const actual = getStringInfo('string-text');
            expect(actual.upperCase).toBe('STRING-TEXT');
        })

        it('return right characters', () => {
            const actual = getStringInfo('string-text');
           
            expect(actual.characters).toEqual(['s','t','r','i','n','g','-','t','e','x','t',]);
            expect(actual.characters).toContain<string>('g');
            expect(actual.characters).toEqual(
                expect.arrayContaining(['s','t','n','g','-','t','e','x','t','r','i',]) // without order
            );
        })

        it('return defined extraInfo', () => {
            const actual = getStringInfo('string-text');

            expect(actual.extrInfo).toEqual({}); // primitive - toBe, objects - toEqual

            expect(actual.extrInfo).not.toBe(undefined);
            expect(actual.extrInfo).not.toBeUndefined(); // or
            expect(actual.extrInfo).toBeDefined(); // or
            expect(actual.extrInfo).toBeTruthy(); // or
        })

    })
});