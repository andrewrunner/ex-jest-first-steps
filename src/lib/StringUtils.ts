

export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object|undefined|null
}

export function getStringInfo(arg:string):StringInfo {
    return {
        lowerCase: arg.toLowerCase(),
        upperCase: arg.toUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        extraInfo: {}
    } 
}


export function toUpperCase(arg: string) {
    if(!arg) {
        throw new Error('Argument is empty!')
    }
    return arg.toUpperCase();
}


export class StringUtils {
    public toUpperCase(arg: string) {
        if(!arg) {
            throw new Error('Argument is empty!')
        }
        return arg.toUpperCase();
    }
}


export function calculateComplexity(stringInfo: StringInfo): number {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}


type LoggetServiceCallback = (arg:string) => void;

export function toUpperCaseWithCb(str:string, callback:LoggetServiceCallback) {
    if(!str) {
        callback("Invalid string!");
        return;
    }

    callback(`Called function with ${str}`);
    return str.toUpperCase();
}
