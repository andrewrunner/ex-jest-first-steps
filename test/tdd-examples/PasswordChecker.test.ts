import { PasswordChecker } from "../../src/lib/PasswordChecker"

describe('PasswordChecker test suite', () => {

    let sut:PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    })


    it('Do nothing', () => {
        sut.checkPassword();
    })


})