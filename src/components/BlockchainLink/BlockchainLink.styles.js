import styled from "styled-components";
import { CopyOutlined, LinkOutlined} from "@ant-design/icons";

export const StyledContainer = styled.div`
  font-size: 0.9rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 1rem 3.5rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  border-radius: 15px;
  background-color: #191b1f;
`;

export const StyledCopy = styled(CopyOutlined)`
  position: absolute;
  right: 0.75rem;
  font-size: 0.85rem;
`;

export const StyledLink = styled.a`
  color: #fff;
  font-size: 0.65rem;
`;

export const StyledLinkIcon = styled(LinkOutlined)`
  position: absolute;
  left: 0.75rem;
  font-size: 0.65rem;
`;