export const Round = (n: number, digits: number) => {
    const tens = Math.pow(10, digits)
    return Math.round(n * tens) / tens;
}