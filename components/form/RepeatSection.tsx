import {VFC} from "react";
import {BaseFieldProps} from "./BaseField";

export type RepeatSectionProps<T> = BaseFieldProps<T[]> & {
    section: (value: T, merge: (newValue: T extends {} ? Partial<T> : T) => void, index: number) => JSX.Element
    blank: () => T
}

export function RepeatSection<T>({
    label,
                                     value,
                                     section,
                                     onChange,
                                     blank
                                 }: RepeatSectionProps<T>): ReturnType<VFC<RepeatSectionProps<T>>> {
    const items = value?.map((v, i) => {
        const merge = (newValue: T extends {} ? Partial<T> : T) => {
            if (typeof v == "object" && !Array.isArray(v)) {
                value[i] = {...v, ...newValue}
            } else {
                value[i] = newValue as T
            }
            console.log(value[i])
            onChange([...value])
        }
        const insertAfter = () => {
            const newValue = [...value]
            newValue.splice(i + 1, 0, blank())
            onChange(newValue)
        }
        const moveUp = () => {
            const newValue = [...value]
            const v = newValue.splice(i, 1)
            newValue.splice(Math.max(i-1, 0), 0, ...v)
            onChange(newValue)
        }
        const moveDown = () => {
            const newValue = [...value]
            const v = newValue.splice(i, 1)
            newValue.splice(i-1, 0, ...v)
            onChange(newValue)
        }
        const moveToTop = () => {
            const newValue = [...value]
            const v = newValue.splice(i, 1)
            newValue.splice(0, 0, ...v)
            onChange(newValue)
        }
        const moveToBottom = () => {
            const newValue = [...value]
            const v = newValue.splice(i, 1)
            newValue.splice(value?.length, 0, ...v)
            onChange(newValue)
        }
        const moveButtons = value?.length > 1 ? <>
            <button onClick={moveUp} aria-label={`Move item ${i + 1} up`}>∧</button>
            <button onClick={moveDown} aria-label={`Move item ${i + 1} down`}>∨</button>
            <button onClick={moveToTop} aria-label={`Move item ${i + 1} to top`}>▲</button>
            <button onClick={moveToBottom} aria-label={`Move item ${i + 1} to bottom`}>▼</button>
        </> : null
        const insertAfterButton = i < value.length - 1 ?
            <button onClick={insertAfter} aria-label={`Insert after ${i + 1}`}>+</button> : null
        const deleteItem = () => {
            const newValue = [...value]
            newValue.splice(i, 1)
            onChange(newValue)
        }
        return <section key={i}>
            {moveButtons}
            {section(v, merge, i)}
            {insertAfterButton}
            <button onClick={deleteItem} aria-label={`Delete item ${i + 1}`}>x</button>
        </section>
    })
    const append = () => {
        onChange([...value || [], blank()])
    }
    const prepend = () => {
        onChange([blank(), ...value || []])
    }
    const prependButton = (value?.length || 0 > 0) ? <button onClick={prepend} aria-label={"Prepend"}>+</button> : null
    return <>
        <label>{label}</label>

        {prependButton}
        {items}
        <button onClick={append} aria-label={"Append"}>+</button>
    </>
}