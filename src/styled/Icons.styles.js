import { default as styled, keyframes } from "styled-components";
import {
  CaretUpFilled,
  CaretDownFilled,
  CopyOutlined,
  LinkOutlined,
  LoadingOutlined
} from "@ant-design/icons";

export const NavIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const IncreaseArrow = styled(CaretUpFilled).attrs((props) => ({
  color: props.color,
}))`
  width: 13px;
  margin-right: 5px;
  color: ${(props) => props.color};
`;

export const DecreaseArrow = styled(CaretDownFilled).attrs((props) => ({
  color: props.color,
}))`
  width: 13px;
  margin-right: 5px;
  color: ${(props) => props.color};
`;

export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align: center;

  @media screen and (min-width: 350px) {
    & {
      margin-top: 20%;
      margin-bottom: 20%;
      color: #fff;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      margin-top: 20%;
      margin-bottom: 20%;
      color: #33363e;
    }
  }
`;

/* GLOBAL INFO BAR */

export const SmallLogo = styled.img`
  width: 15px;
  margin-right: 0.25rem;
`;

const gradientGlobal = keyframes`
  from {
    background-position: 150% 50%;
  }
  to {
    background-position: -50% 50%;
  }
`;

export const ContentLoadingGlobal = styled.div`
  background: linear-gradient(45deg, #1f2128, #1f2128, #33363e, #1f2128, #1f2128);
  background-size: 200% 200%;
  animation: ${gradientGlobal} 1s ease infinite;
  width: 100%;
  height: 25%;
`;


/* HOME PAGE */
const gradient = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .25;
  }
  100% {
    opacity: 1;
  }
`;

export const ContentLoading = styled.div`
  background: #33363e;
  background-size: 200% 200%;
  animation: ${gradient} 2s ease infinite;
  width: 100%;
  height: 1rem;
`;

/* SINGLE COIN PAGE */

export const StyledLinkIcon = styled(LinkOutlined)`
  margin-right: 0.5rem;
  font-size: 0.75rem;
`;

export const StyledLayerIcon = styled.img`
  width: 20px;
  filter: invert(100%);
  margin: ${(props) => props.margin};
`;

export const StyledPlus = styled.img`
  width: 18px;
  box-sizing: border-box;
  margin-right: 0.75rem;
`;

export const StyledCopy = styled(CopyOutlined)`
  position: absolute;
  right: 0.75rem;
  font-size: 0.85rem;
`;
