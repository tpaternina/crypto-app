import { default as styled, keyframes } from "styled-components";
import {
  CaretUpFilled,
  CaretDownFilled,
  CloseOutlined,
  CopyOutlined,
  DeleteFilled,
  DisconnectOutlined,
  EditFilled,
  FileImageOutlined,
  InboxOutlined,
  LinkOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { mobile, tablet, medium } from "./Sizes.styles";

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

export const StyledLoading = styled(LoadingOutlined).attrs(props => ({
  left: props.left || "45%",
  top: props.top || "45%"
}))`
  font-size: 3rem;
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};

  ${mobile} {
    & {
      color: #fff;
    }
  }

  ${tablet} {
    & {
      color: #33363e;
    }
  }
`;

export const LoadingMoreCoins = styled(LoadingOutlined)`
  font-size: 1rem;
  margin: 1rem auto;

  ${mobile} {
    & {
      color: #fff;
    }
  }

  ${tablet} {
    & {
      color: #33363e;
    }
  }
`;

export const StyledLoadingList = styled(SyncOutlined)`
  font-size: 2.5rem;
  color: #40454f;
`;

export const StyledDisconnected = styled(DisconnectOutlined)`
  color: #40454f;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

/* GLOBAL INFO BAR */

export const SmallLogo = styled.img`
  width: 15px;
  margin-right: 0.25rem;
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
  background: ${(props) => props.color};
  background-size: 200% 200%;
  animation: ${gradient} 2s ease infinite;
  width: 100%;
  height: 1rem;
`;

export const StyledBar = styled.div.attrs((props) => ({
  ...props,
}))`
  background-color: ${(props) => props.color};
  height: 0.5rem;
  width: ${(props) => props.width};
  border-radius: 5px;
`;

/* SINGLE COIN PAGE */

export const StyledLinkIcon = styled(LinkOutlined)`
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

  ${mobile} {
    background-color: #2c2d33;
  }

  ${medium} {
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

  ${mobile} {
    background-color: #2c2d33;
  }

  ${medium} {
    background-color: #191b1f;
  }
`;

/* ADD ASSET MODAL */

export const StyledFileImageIcon = styled(FileImageOutlined)`
  color: #40454f;
  width: 75%;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  padding: 1.25rem 1rem;
`;

export const StyledClose = styled(CloseOutlined)`
  position: absolute;
  top: 0;
  right: 0;
  color: #06d554;
  font-weight: bold;

  ${mobile} {
    font-size: 2rem;
  }

  ${tablet} {
    font-size: 1.25rem;
  }
`;

/* CONVERTER */

export const CurrencyTag = styled.div`
  position: absolute;
  top: 3px;
  left: 0;
  background-color: #06d554;
  color: #fff;
  font-weight: bold;

  display: flex;
  align-items: center;
  height: 31px;

  padding: 0 1rem;
  border-radius: 6px 0 0 6px;
`;
