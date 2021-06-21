import styled from "styled-components";
import { default as _ } from "lodash";
import React from "react";

const StyledBar = styled.div`
  background-color: ${(props) => props.color};
  height: 0.6rem;
  width: ${(props) => props.width}%;
  border-radius: 5px;
  ${(props) => (props.bottom ? "margin-top: .5rem" : "margin-top: 0;")}
`;

export default class ColorBar extends React.Component {
  render() {
    const { numerator, denominator, numeratorColor, denominatorColor } =
      this.props;
    const fraction = (denominator && (100 * numerator) / denominator) || 100;

    return (
      <StyledBar width={100} color={denominatorColor} bottom>
        <StyledBar width={_.clamp(fraction, 0, 100)} color={numeratorColor} />
      </StyledBar>
    );
  }
}
