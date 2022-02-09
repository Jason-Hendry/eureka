import React, {FC, useEffect, useState} from 'react'
import {Container} from "@material-ui/core";
import {Secret} from "./Secret";
import AdminAppBar from "./AppBar";
import {useRouter} from "next/router";
import {useLocalStorage} from "../../effects/UseLocalStorage";

export const AdminTheme:FC<unknown> = ({children}) => {
    const router = useRouter()
    const [secret, setSecret] = useLocalStorage("secret", "")
    const [renderChildren, setRenderChildren] = useState<JSX.Element>(<></>)
    const [renderAppBar, setRenderAppBar] = useState<JSX.Element>()

    // Prevent React Hydration Error by only rendering AppBar and children on the client side
    useEffect(() => {
        if(secret) {
            setRenderChildren(<div>{children}</div>)
            setRenderAppBar(<AdminAppBar logout={logout}/>)
        }
    }, [secret, children])

    const logout = () => {
        setSecret("")
    }

    if(process.browser && !secret) {
        router.push("/login#"+encodeURIComponent(router.asPath))
    }

    return <Secret.Provider value={secret}>
        {renderAppBar}
        <Container>{renderChildren}</Container>
    </Secret.Provider>
}
export default AdminTheme;

