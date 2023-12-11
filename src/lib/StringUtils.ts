

export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extrInfo: Object|undefined|null
}

export function getStringInfo(arg:string):StringInfo {
    return {
        lowerCase: arg.toLowerCase(),
        upperCase: arg.toUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        extrInfo: {}
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
    return Object.keys(stringInfo.extrInfo).length * stringInfo.length;
}
