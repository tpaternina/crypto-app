import { default as styled, keyframes } from "styled-components";
import {
  CaretUpFilled,
  CaretDownFilled,
  CloseOutlined,
  CopyOutlined,
  DeleteFilled,
  EditFilled,
  FileImageOutlined,
  InboxOutlined,
  LinkOutlined,
  LoadingOutlined,
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
  background: linear-gradient(
    45deg,
    #1f2128,
    #1f2128,
    #33363e,
    #1f2128,
    #1f2128
  );
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

/* PORTFOLIO PAGE */

export const EmptyListIcon = styled(InboxOutlined)`
  color: #40454f;
  font-size: 6rem;
`;

export const StyledEditIcon = styled(EditFilled)`
  color: #ffb528;
  border-radius: 6px;
  padding: 0.5rem;
  margin-left: 0.5rem;
  font-size: 0.75rem;
  &:hover {
    cursor: pointer;
    background-color: #ffb528;
    color: #fff;
  }

  @media screen and (min-width: 350px) {
    background-color: #2c2d33;
  }

  @media screen and (min-width: 768px) {
    background-color: #191b1f;
  }
`;

export const StyledDeleteIcon = styled(DeleteFilled)`
  color: #fe1040;
  border-radius: 6px;
  background-color: #191b1f;
  padding: 0.5rem;
  margin-left: 0.5rem;
  font-size: 0.75rem;
  &:hover {
    cursor: pointer;
    background-color: #fe1040;
    color: #fff;
  }

  @media screen and (min-width: 350px) {
    background-color: #2c2d33;
  }

  @media screen and (min-width: 768px) {
    background-color: #191b1f;
  }
`;


/* ADD ASSET MODAL */

export const StyledFileImageIcon = styled(FileImageOutlined)`
  color: #40454f;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  padding: 1.25rem;
`;

export const StyledClose = styled(CloseOutlined)`
  position: absolute;
  top: 0;
  right: 0;
  color: #06d554;
  font-weight: bold;

  @media screen and (min-width: 350px) {
    font-size: 2rem;
  }

  @media screen and (min-width: 576px) {
    font-size: 1.25rem;
  }
`;