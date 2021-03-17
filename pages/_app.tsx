import {AppProps} from "next/app";

import '../assets/scss/nextjs-material-kit.scss'
import AdminTheme from "../layout/Admin/AdminTheme";
import Head from "next/head";
import {GTMPageView} from "../services/gtm";

function MyApp({ Component, pageProps, router }: AppProps) {
    const admin = router.pathname.match('^/admin');
    if(admin) {
       return <AdminTheme><Component {...pageProps} /></AdminTheme>
    }
    return <>
        <Head>
            <title>Eureka Cycling</title>
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp;

