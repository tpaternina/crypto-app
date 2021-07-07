import { usePalette } from "react-palette";
import { formatLongNumber } from "utils";
import { MarketDiv, MarketInfoRow, StyledInfo } from "./MarketInfo.styles";
import { ColorBar } from "components";

export default function MarketInfo(props) {
  const { numerator, denominator, logoUrl, currency, percentage, singleCoin, width } = props;
  const url = singleCoin ? logoUrl.split("/").splice(4).join("/") : logoUrl.split("/").splice(3).join("/")
  const { data } = usePalette(url);
  const fraction = numerator * 100 / denominator
  return (
    <StyledInfo width={width || "100%"}>
      <MarketInfoRow>
        <MarketDiv color={data.vibrant}>
          • {percentage ? `${fraction.toFixed(2)}%` : formatLongNumber(numerator, currency)}
        </MarketDiv>
        <MarketDiv color={data.lightMuted}>
          • {percentage ?  `${(100 - fraction).toFixed(2)}%` : formatLongNumber(denominator, currency)}
        </MarketDiv>
      </MarketInfoRow>
      <MarketInfoRow bottom>
        <ColorBar
          numerator={numerator}
          denominator={denominator}
          numeratorColor={data.vibrant}
          denominatorColor={data.lightMuted}
          width="100%"
        />
      </MarketInfoRow>
    </StyledInfo>
  );
}
