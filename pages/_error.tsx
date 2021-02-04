import React, { Component } from "react";
import Router from "next/router";

export default class _error extends Component {

  render() {
    return <div>
      <h1>Error</h1>

      <pre>{JSON.stringify(this.props)}</pre>
    </div>;
  }
}
