import { usePalette } from "react-palette";
import { formatLongNumber } from "utils";
import { MarketDiv, MarketInfoRow, StyledInfo } from "./MarketInfo.styles";
import { ColorBar } from "components";

export default function MarketInfo(props) {
  const {
    numerator,
    denominator,
    logoUrl,
    currency,
    percentage,
    singleCoin,
    width,
  } = props;
  let url;
  if (process.env.NODE_ENV === "development") {
    url = singleCoin
      ? logoUrl.split("/").splice(4).join("/")
      : logoUrl.split("/").splice(3).join("/");
  } else {
    url = logoUrl;
  }
  const { data } = usePalette(url);
  const fraction = denominator
    ? ((numerator * 100) / denominator).toFixed(2)
    : "∞";
  return (
    <StyledInfo width={width || "100%"}>
      <MarketInfoRow>
        <MarketDiv color={data.vibrant}>
          •
          {percentage
            ? `${typeof fraction === "number" ? `${fraction}%` : fraction}`
            : formatLongNumber(numerator, currency)}
        </MarketDiv>
        <MarketDiv color={data.lightVibrant}>
          •
          {percentage
            ? `${
                typeof fraction === "number" ? `${100 - fraction}%` : fraction
              }`
            : formatLongNumber(denominator, currency)}
        </MarketDiv>
      </MarketInfoRow>
      <MarketInfoRow bottom>
        <ColorBar
          numerator={numerator}
          denominator={denominator}
          numeratorColor={data.vibrant}
          denominatorColor={data.lightVibrant}
          width="100%"
        />
      </MarketInfoRow>
    </StyledInfo>
  );
}
