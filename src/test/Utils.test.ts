import { getStringInfo, toUpperCase } from "../app/Utils";

describe('Utils test suite', () => {

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