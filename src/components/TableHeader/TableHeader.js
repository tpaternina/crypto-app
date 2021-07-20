import React from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { StyledIcon, StyledHeader } from "./TableHeader.styles";

export default class TableHeader extends React.Component {
  state = {
    descending: this.props.text === "#" ? false : true,
  };

  toggleOrder = () => {
    // toggle descending order
    this.setState({ descending: !this.state.descending });
    this.props.toggleOrder(this.props.sortBy, !this.state.descending);
  };

  render() {
    return (
      <StyledHeader onClick={this.toggleOrder}>
        {this.props.text}
        <StyledIcon>
        {this.state.descending ? (
          <DownOutlined />
        ) : (
          <UpOutlined />
        )}
        </StyledIcon>
      </StyledHeader>
    );
  }
}
