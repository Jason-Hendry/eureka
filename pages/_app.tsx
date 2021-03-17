import {AppProps} from "next/app";

import '../assets/scss/nextjs-material-kit.scss'
import AdminTheme from "../layout/Admin/AdminTheme";

function MyApp({ Component, pageProps, router }: AppProps) {
    const admin = router.pathname.match('^/admin');
    if(admin) {
       return <AdminTheme><Component {...pageProps} /></AdminTheme>
    }
    return <Component {...pageProps} />
}

export default MyApp;

