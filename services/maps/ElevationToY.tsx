export const elevationToY = (elevation: number, [min, max]: [number, number], height: number): number => {
    const range = max - min
    const zeroedElevation = elevation - min
    return height - (zeroedElevation / range * height)
}