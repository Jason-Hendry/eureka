

export type BaseFieldProps<T> = {
    value: T
    label: string
    onChange: (value: T) => void
}
