
export enum PasswordErrors {
    SHORT = "Password must be more 8 or more characters length!",
    NO_UPPER_CASE = "Password must have upper case letters!",
    NO_LOWER_CASE = "Password must have lower case letters!",
    NO_NUMBER = "Password must have numbers!",
}

export interface PasswordCheckResult {
    isValid: boolean,
    reasons: PasswordErrors[]
}

export class PasswordChecker {

    public checkPassword(password:string):PasswordCheckResult {
        const checkErrors:PasswordErrors[] = [];

        this.checkForLength(password, checkErrors);
        this.checkForUpperCase(password, checkErrors);
       this.checkForLowerCase(password, checkErrors);
        
        return {
            isValid: !checkErrors.length,
            reasons: checkErrors
        };
    }

    public checkAdminPassword(password:string):PasswordCheckResult { 
        const basicCheck = this.checkPassword(password);
        this.checkForNumber(password, basicCheck.reasons);
        return basicCheck;
    }




    private checkForNumber(password: string, checkErrorsRef:PasswordErrors[]) {
        const hasNumber = /\d/;
        if(!hasNumber.test(password)) {
            checkErrorsRef.push(PasswordErrors.NO_NUMBER);
        }
    }
    private checkForLength(password: string, checkErrorsRef:PasswordErrors[]) {
        if(password.length < 8) {
            checkErrorsRef.push(PasswordErrors.SHORT);
        }
    }
    private checkForUpperCase(password: string, checkErrorsRef:PasswordErrors[]) {
       if(password == password.toLowerCase()) {
           checkErrorsRef.push(PasswordErrors.NO_UPPER_CASE);
        }
    }
    private checkForLowerCase(password: string, checkErrorsRef:PasswordErrors[]) {
        if(password == password.toUpperCase()) {
            checkErrorsRef.push(PasswordErrors.NO_LOWER_CASE);
        }
    }
}