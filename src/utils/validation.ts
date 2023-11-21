/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */


export function isCharacterString(value: any): boolean {
    return /^[A-Za-z\s'-]+$/.test(value)
}

export function isEmail(value: any): boolean {
    return /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i.test(value)
}