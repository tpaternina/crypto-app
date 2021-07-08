import styled from "styled-components";
import { Row } from "antd";
import { LinkOutlined } from "@ant-design/icons";

export const LogoContainer = styled.img`
  background-color: #1f2128;
  border-radius: 6px;

  padding: 1.25rem;
  box-sizing: border-box;
  margin: 2rem auto 0 auto;
`;

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

export const StyledName = styled.h2`
  color: #fff;
  margin: 1.5rem auto 2rem auto;
`;

export const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;
`;
