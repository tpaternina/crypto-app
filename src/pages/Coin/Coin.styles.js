import styled from "styled-components";
import { Col, Row } from "antd";
import { LinkOutlined, LoadingOutlined } from "@ant-design/icons";

export const LogoContainer = styled.img`
  background-color: #1f2128;
  border-radius: 10px;

  padding: 1.25rem;
  box-sizing: border-box;
  margin: 2rem auto 0 auto;
`;

export const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;

  border: 1px solid white;
`;

export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid white;
`;


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

  border-radius: 15px;
  border-collapse: collapse;
  background-color: #191b1f;

  &:first-of-type {
    margin-bottom: 0.75rem;
  }

  &:only-child {
    margin-bottom: 0;
  }
`;

export const StyledLinkIcon = styled(LinkOutlined)`
  position: absolute;
  left: 0.75rem;

  font-size: 0.65rem;
`;

export const StyledLink = styled.a`
  color: #fff;
  font-size: 0.65rem;
`;

export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align: center;
  color: #33363e;
`;

export const StyledName = styled.h2`
  color: #fff;
  margin: 1.5rem auto 2rem auto;
`;

export const StyledPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;

  margin-bottom: .5rem;
`

export const StyledIncrease = styled.span.attrs(props => ({
  increase: props.increase
}))`
  color: ${props => props.increase ? "#00fc2a" : "#fe1040"};
  font-size: 1rem;
  margin: 0 .25rem;
`

export const StyledLayerIcon = styled.img`
  width: 20px;
  filter: invert(100%);
`

export const StyledTitle = styled.h3`
  color: #fff;
`;
