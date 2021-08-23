import { formatLongNumber } from "utils";
import { MarketDiv, MarketInfoRow, StyledInfo } from "styled";
import { ColorBar } from "components";

export default function MarketInfo(props) {
  const { numerator, denominator, currency, percentage, width } = props;

  const fraction = denominator
    ? (numerator * 100) / denominator
    : "∞";
  return (
    <StyledInfo width={width || "100%"}>
      <MarketInfoRow>
        <MarketDiv color="#fff">
          •
          {percentage
            ? `${typeof fraction === "number" ? `${(fraction).toFixed(2)}%` : fraction}`
            : formatLongNumber(numerator, currency)}
        </MarketDiv>
        <MarketDiv color="#06d554">
          •
          {percentage
            ? `${
                typeof fraction === "number" ? `${(100 - fraction).toFixed(2)}%` : fraction
              }`
            : formatLongNumber(denominator, currency)}
        </MarketDiv>
      </MarketInfoRow>
      <MarketInfoRow bottom>
        <ColorBar
          numerator={numerator}
          denominator={denominator}
          width="100%"
        />
      </MarketInfoRow>
    </StyledInfo>
  );
}
