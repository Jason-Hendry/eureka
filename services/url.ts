
export function toURL(str: string) {
    return encodeURI(str.toLowerCase().replace(/[^a-z0-9]/g, '_'))
}
