import styled from "styled-components";



export const CoinTable = styled.table`
  text-align: left;
  font-size: 0.9rem;

  margin: 1rem 0;
  width: 100%;
  box-sizing: border-box;

  border-radius: 15px;
  border-collapse: collapse;
  background-color: #191b1f;

  thead {
    font-weight: 900;
  }

  tbody tr {
    border-bottom: solid 1px #fff;
  }

  tbody tr:last-of-type {
    border: none;
  }

  th,
  td {
    padding: 1.5rem 0.75rem;
  }

  th {
    padding-bottom: 0;
  }

  tr {
    vertical-align: bottom;
  }
`;
