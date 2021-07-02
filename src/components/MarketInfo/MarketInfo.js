import { usePalette } from "react-palette";
import { formatLongNumber } from "utils";
import { MarketDiv, MarketInfoRow, StyledInfo } from "./MarketInfo.styles";
import { ColorBar } from "components";

export default function MarketInfo(props) {
  const { numerator, denominator, logoUrl, currency } = props;
  const { data } = usePalette(logoUrl.split("/").splice(3).join("/"));

  return (
    <StyledInfo>
      <MarketInfoRow>
        <MarketDiv color={data.vibrant}>
          • {formatLongNumber(numerator, currency)}
        </MarketDiv>
        <MarketDiv color={data.lightMuted}>
          • {formatLongNumber(denominator, currency)}
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
