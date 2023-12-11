import { PasswordChecker, PasswordErrors } from "../../src/lib/PasswordChecker"

describe('PasswordChecker test suite', () => {

    let sut:PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    })


    it('Password with less 8 charactest is invalid', () => {
         let actual = sut.checkPassword('12345Ab');
         expect(actual.isValid).toBe(false);
         expect(actual.reasons).toContain(PasswordErrors.SHORT);
    })
    it('Password with more than 8 charactest is ok', () => {
        let actual = sut.checkPassword('1234567Vd');
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
   })


   it('Password with no upper case letter is invalid', () => {
        let actual = sut.checkPassword('abc');
        expect(actual.isValid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
    })
    it('Password with upper case letter is valid', () => {
        let actual = sut.checkPassword('aBc');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
    })


    it('Password with no lower case letter is invalid', () => {
        let actual = sut.checkPassword('ABC12345678');
        expect(actual.isValid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
    })
    it('Password with lower case letter is valid', () => {
        let actual = sut.checkPassword('aBc12345678');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
    })


    it('Valid password', () => {
        let actual = sut.checkPassword('1234aBc567');
        expect(actual.isValid).toEqual(true);
        expect(actual.reasons).toHaveLength(0);
    })



    it('Admin password without number is invalid', () => {
        let actual = sut.checkAdminPassword('ABCabc');
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
    })
    it('Admin password with number is valid', () => {
        let actual = sut.checkAdminPassword('ABCabc1234');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
    })

})