

export type BaseFieldProps<T> = {
    id: string
    value: T|null
    label: string
    onChange: (value: T|null) => void
    placeholder?: string
}
