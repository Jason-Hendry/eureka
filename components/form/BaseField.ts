

export type BaseFieldProps<T> = {
    id?: string
    value: T
    label: string
    onChange: (value: T) => void
}
