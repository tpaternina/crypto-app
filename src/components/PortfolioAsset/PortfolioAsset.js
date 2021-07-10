export default function PortfolioAsset(props) {
  const { coin } = props;

  return Object.entries(coin).map(([key, val]) => (
    <p>
      {key}, {val}
    </p>
  ));
}
