import { clamp } from "lodash";
import React from "react";
import { StyledBar } from "./ColorBar.styles";

export default function ColorBar(props) {
  const { numerator, denominator } = props;
  const fraction = (denominator && (100 * numerator) / denominator) || 100;

  return (
    <StyledBar width="100%" color="#06d554" bottom>
      {/* Set a minimum of 10% so that the fraction is still visible with small color bars */}
      <StyledBar
        width={`${clamp(fraction, 10, 100)}%`}
        color="#fff"
    </StyledBar>
  );
}
