import {AppProps} from "next/app";

import AdminTheme from "../layout/Admin/AdminTheme";
import Head from "next/head";

import CssBaseline from '@material-ui/core/CssBaseline';
import {StylesProvider, ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import {red} from '@material-ui/core/colors';
import React from "react";
import {SheetsRegistry} from "jss";

export const theme = createMuiTheme({
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

function MyApp({Component, pageProps, router}: AppProps) {
    const admin = router.pathname.match('^/admin');

    if (admin) {
        return <AdminTheme><Component {...pageProps} /></AdminTheme>
    }

    return (
        <>
            <Head>
                <title>Eureka Cycling</title>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

export default MyApp;

