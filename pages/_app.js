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
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

import "assets/scss/nextjs-material-kit.scss?v=1.0.0";
import AdminTheme from "../components/AdminTheme/AdminTheme";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";

// Router.events.on("routeChangeStart", url => {
//   console.log(`Loading: ${url}`);
//   document.body.classList.add("body-page-transition");
//   ReactDOM.render(
//     <PageChange path={url} />,
//     document.getElementById("page-transition")
//   );
// });
// Router.events.on("routeChangeComplete", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });
// Router.events.on("routeChangeError", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });

const theme = createMuiTheme({
});

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    // console.log("ctx", ctx)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const admin = ctx.pathname.match(/^\/admin/)

    return { pageProps, admin };
  }
  render() {
    const { Component, pageProps, admin } = this.props;

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
