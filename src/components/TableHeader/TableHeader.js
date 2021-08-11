import React, { useEffect } from "react";
import { useToggle } from "react-use";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { StyledIcon, StyledHeader } from "./TableHeader.styles";

export default function TableHeader(props) {
  const { text, sortBy, toggleOrder } = props;

  const [descending, toggleDescending] = useToggle(text === "#" ? false : true);

  useEffect(() => {
    toggleOrder(sortBy, descending);
    // eslint-disable-next-line
  }, [descending]);

  return (
    <StyledHeader onClick={toggleDescending}>
      {props.text}
      <StyledIcon>{descending ? <DownOutlined /> : <UpOutlined />}</StyledIcon>
    </StyledHeader>
  );
}
