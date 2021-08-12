import React, { useEffect, useRef } from "react";
import { useToggle } from "react-use";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { StyledIcon, StyledHeader } from "./TableHeader.styles";

export default function TableHeader(props) {
  const { text, sortBy, toggleOrder } = props;

  const [descending, toggleDescending] = useToggle(text === "#" ? false : true);
  const prevDescRef = useRef(text === "#" ? false : true);
  const prevDesc = prevDescRef.current;

  useEffect(() => (prevDescRef.current = descending), [descending]);

  useEffect(() => {
    if (prevDesc !== descending) {
      toggleOrder(sortBy, descending);
    }
    // eslint-disable-next-line
  }, [descending]);

  return (
    <StyledHeader onClick={toggleDescending}>
      {props.text}
      <StyledIcon>{descending ? <DownOutlined /> : <UpOutlined />}</StyledIcon>
    </StyledHeader>
  );
}
