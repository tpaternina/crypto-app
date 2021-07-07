import styled from "styled-components";

export const StyledContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  margin: 0;
  padding: 1.5rem 2.5rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  border-radius: 15px;
  background-color: #191b1f;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid white;
`;

export const StyledInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin: .35rem 0;
`;

export const StyledPercentage = styled.span`
  margin-left: 0.5rem;
  font-weight: bold;
`;

export const StyledPlus = styled.img`
  width: 18px;
  box-sizing: border-box;
  margin-right: 0.75rem;
`;

export const StyledSectionTitle = styled.span`
  margin-right: 0.5rem;
  font-weight: bold;
  text-transform: capitalize;
`;
