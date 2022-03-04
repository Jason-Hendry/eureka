import {AppProps} from "next/app";

import React from "react";
import Head from "next/head";
import CssBaseline from '@mui/material/CssBaseline';

import {ThemeProvider} from "@mui/styles";
import {createTheme} from "@mui/material";
import {red} from "@mui/material/colors";

import AdminTheme from "../layout/Admin/AdminTheme";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
})

function MyApp({Component, pageProps, router}: AppProps): JSX.Element {
    const admin = router.pathname.match('^/admin');

    return (
        <>
            <Head>
                <title>Eureka Cycling</title>
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {admin  ? <AdminTheme><Component {...pageProps} /></AdminTheme> : <Component {...pageProps} />}
            </ThemeProvider>
        </>
    )
}

export default MyApp;

