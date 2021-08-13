import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

export const ChartCol = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 350px) {
    & {
      flex-direction: column;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      flex-direction: row;
    }
  }
`;

export const ChartContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;

  margin: 0;
  padding: 25% 0.25rem 0 0.25rem;
  width: 50%;
  position: relative;

  border-radius: 6px;
  border-collapse: collapse;
  background-color: #191b1f;

  @media screen and (min-width: 350px) {
    & {
      width: 100%;
      padding: 50% 0.25rem 0 0.25rem;
    }
    &:last-of-type {
      margin-left: 0px;
      margin-top: 50px;
    }
  }

  @media screen and (min-width: 600px) {
    & {
      width: 75%;
      padding: 40% 0.25rem 0 0.25rem;
    }
    &:last-of-type {
      margin-left: 0px;
      margin-top: 50px;
    }
  }
  @media screen and (min-width: 768px) {
    & {
      width: 50%;
      padding: 25% 0.25rem 0 0.25rem;
    }
    &:last-of-type {
      margin-left: 50px;
      margin-top: 0px;
    }
  }
`;

export const ChartDiv = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 15px 15px 0px 5px;

  @media screen and (min-width: 900px) {
    & {
      padding: 35px 25px 25px 15px;
    }
  }
`;

export const ChartInfo = styled.div`
  width: 100%;

  position: absolute;
  top: 10px;
  left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledInfo = styled.p`
  color: #fff;
  margin: 0;

  @media screen and (max-width: 936px) {
    & {
      font-size: 0.75rem;
    }
  }
`;

export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align: center;
  color: #33363e;

  position: absolute;
  top: 45%;
  left: 45%;
`;

export const StyledPrice = styled.h1`
  color: #fff;
  font-weight: bold;
  margin: 0.5rem 0;
  @media screen and (max-width: 936px) {
    & {
      font-size: 1rem;
    }
  }
`;
