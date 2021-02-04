import React, {Component, FC} from "react";

export const _error: FC = () => {

    return <div>
      <h1>Error</h1>

      <pre>{JSON.stringify(this.props)}</pre>
    </div>;
}
