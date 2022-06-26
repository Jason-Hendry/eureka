import {AppProps} from "next/app";

import React from "react";
import Head from "next/head";
import CssBaseline from '@mui/material/CssBaseline';

import {createTheme, ThemeProvider} from "@mui/material/styles";
import {red} from "@mui/material/colors";

import AdminTheme from "../layout/Admin/AdminTheme";

export const theme = createTheme({
    shape: {
        borderRadius: 0
    },
    palette: {
        primary: {
            main: '#0054A5',
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
    typography: {
        h1: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "30px",
            textTransform: "uppercase"
        },
        h2: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "24px",
            textTransform: "uppercase"
        },
        h3: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "22px",
        },
        h4: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "20px",
        },
        h5: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "18px",
        }
    }
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

