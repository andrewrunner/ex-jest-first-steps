
export function toUpperCase(arg: string) {
    return arg.toUpperCase();
}

export type stringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extrInfo: Object|undefined|null
}

export function getStringInfo(arg:string):stringInfo {
    return {
        lowerCase: arg.toLowerCase(),
        upperCase: arg.toUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        extrInfo: {}
    } 
}