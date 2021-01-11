/*!

=========================================================
* NextJS Material Kit v1.0.0 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import "assets/scss/nextjs-material-kit.scss?v=1.0.0";
import AdminTheme from "../components/AdminTheme/AdminTheme";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {GTMPageView} from "../services/gtm";

const theme = createMuiTheme({
});


const handleRouteChange = (url) => GTMPageView(url);

export default class MyApp extends App {

  componentDidMount() {
    Router.events.on('routeChangeComplete', handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', handleRouteChange);
  }

  render() {
    const { Component, pageProps, router } = this.props;

    const admin = router.pathname.match('^/admin');

    const wrap = admin ? <AdminTheme>
      <Component {...pageProps} />
    </AdminTheme> : <Component {...pageProps} />

    return (
      <React.Fragment>
        <Head>
          <title>Eureka Cycling</title>
        </Head>
        <ThemeProvider theme={theme}>
          {wrap}
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
