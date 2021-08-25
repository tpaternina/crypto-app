import parse from "html-react-parser";
import { layers } from "assets";
import { CoinContainer, StyledDescription, StyledLayerIcon } from "styles";

export default function CoinDescription(props) {
  const { data } = props;

  return (
    <CoinContainer>
      <StyledLayerIcon src={layers} margin="1.5rem auto" />
      <StyledDescription
        ellipsis={{
          rows: 6,
          expandable: true,
          symbol: "Read more",
        }}
      >
        {data.description["en"] ? (
          parse(data.description["en"])
        ) : (
          <small>Description unavailable</small>
        )}
      </StyledDescription>
    </CoinContainer>
  );
}
