

let idCount = 0

export const GetUniqueId = (id?: string) => {
    return id ? id : `field_${idCount++}`
}