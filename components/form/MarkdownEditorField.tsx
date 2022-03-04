import React, {FC, useState, VFC} from "react";
import {BaseFieldProps} from "./BaseField";
import Editor, {theme} from "rich-markdown-editor";


export const MarkdownEditorField: FC<BaseFieldProps<string>> = ({label, onChange, value, id,placeholder}) => {

    const [initialValue, setInitialValue] = useState(value)

    return (
        <>
            <label>{label}</label>
            <Editor
                value={initialValue || ""}
                onChange={(v) => onChange(v() || null)}
            />
        </>
    )
}


export const DisplayMarkdown: VFC<{value: string}> = ({value}) => <Editor value={value} readOnly={true} theme={{...theme, background:"transparent"}} />