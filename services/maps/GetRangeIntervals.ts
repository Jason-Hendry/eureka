export function GetRangeIntervals([min, max]: [number, number], atEvery: number): number[] {
    let x = Math.ceil(min/atEvery)*atEvery
    const result: number[] = []
    while(x < max) {
        result.push(x)
        x+=atEvery
    }
    return result
}