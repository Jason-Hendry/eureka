

// @ts-ignore
export interface Race {
    id: string
    data: RaceData
}
export type RaceList = Array<Race>;

export interface RaceData {
    Title: string
    Date?: string
    RegistrationCutoff?: string
    RaceStartTime?: string
    Course?: string
}


