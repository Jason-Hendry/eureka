import {AppProps} from "next/app";

// import '../assets/scss/nextjs-material-kit.scss'
import AdminTheme from "../layout/Admin/AdminTheme";
import Head from "next/head";
import {GTMPageView} from "../services/gtm";

import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from "@material-ui/styles";
import {useEffect} from "react";
import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({

})

function MyApp({ Component, pageProps, router }: AppProps) {
    const admin = router.pathname.match('^/admin');
    if(admin) {
       return <AdminTheme><Component {...pageProps} /></AdminTheme>
    }

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles?.parentElement?.removeChild(jssStyles);
        }
        router.push(document.location.pathname)
    }, []);

    return <>
        <Head>
            <title>Eureka Cycling</title>
        </Head>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    </>
}

export default MyApp;

