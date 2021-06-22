import React from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export default class TableHeader extends React.Component {
  // HANDLE CLICKING ON OTHER COMPONENT AND RESETTING DESCENDING ORDER
  state = {
    descending: true,
  };

  toggleOrder = () => {
    // toggle descending order
    this.setState({ descending: !this.state.descending });
    this.props.toggleOrder(this.props.sortBy, !this.state.descending);
  };

  render() {
    return (
      <span onClick={this.toggleOrder}>
        {this.props.text}{" "}
        {this.state.descending ? (
          <DownOutlined style={{ fontSize: "0.75rem", fontWeight: "bold" }} />
        ) : (
          <UpOutlined style={{ fontSize: "0.75rem", fontWeight: "bold" }} />
        )}
      </span>
    );
  }
}
