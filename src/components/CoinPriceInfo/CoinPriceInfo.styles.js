import styled from "styled-components";

export const StyledAllTimeContainer = styled.div`
  margin-top: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledAllTimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  & > div:last-of-type {
    margin-top: .35rem;
  }
`

export const StyledContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 1rem 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  border-radius: 6px;
  background-color: #191b1f;
`;

export const StyledIncrease = styled.span.attrs((props) => ({
  increase: props.increase,
}))`
  color: ${(props) => (props.increase ? "#00fc2a" : "#fe1040")};
  font-size: 1rem;
  margin: 0 0.25rem;
`;

export const StyledPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;

  margin-bottom: 0.5rem;
`;

export const StyledLayerIcon = styled.img`
  width: 20px;
  filter: invert(100%);
`;
