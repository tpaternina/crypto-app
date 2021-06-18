import React from "react";
import { Coins } from "components"

export default class Home extends React.Component {
  render() {
    return (
      <>
        <h2>Market Overview</h2>
        <Coins currency={this.props.currency} />
      </>
    );
  }
}
