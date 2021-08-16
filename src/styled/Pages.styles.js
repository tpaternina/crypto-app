import styled from "styled-components";

export const WideDiv = styled.div`
  @media screen and (min-width: 350px) {
    & {
      display: none;
    }
  }

  @media screen and (min-width: 570px) {
    & {
      display: block;
    }
  }
`;

export const NarrowDiv = styled.div`
  width: 100%;
  padding: 0 1rem;
  position: absolute;
  top: 60px;
  left: 0;
  @media screen and (min-width: 350px) {
    & {
      display: block;
    }
  }

  @media screen and (min-width: 570px) {
    & {
      display: none;
    }
  }
`;

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
