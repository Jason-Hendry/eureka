

let idCount = 0

export const GetUniqueId = (id?: string): string => {
    return id ? id : `field_${idCount++}`
}