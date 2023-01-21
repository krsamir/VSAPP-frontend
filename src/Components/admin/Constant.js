import moment from "moment";
import styled from "styled-components";

export const Table = styled.table`
  &.table__main {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
  }

  td {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 10px;
    background-color: aliceblue;
  }

  tr:nth-child(even) {
    /* background-color: #dddddd; */
  }
  th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 10px;
  }
`;

export const MONTHS = [
  { id: 1, name: `January`, value: 1 },
  { id: 2, name: `February`, value: 2 },
  { id: 3, name: `March`, value: 3 },
  { id: 4, name: `April`, value: 4 },
  { id: 5, name: `May`, value: 5 },
  { id: 6, name: `June`, value: 6 },
  { id: 7, name: `July`, value: 7 },
  { id: 8, name: `August`, value: 8 },
  { id: 9, name: `September`, value: 9 },
  { id: 10, name: `October`, value: 10 },
  { id: 11, name: `November`, value: 11 },
  { id: 12, name: `December`, value: 12 },
];

export const YEAR = moment().year();

export const YEAR_LIST = [
  { id: 0, value: YEAR },
  { id: 1, value: YEAR - 1 },
  { id: 2, value: YEAR - 2 },
];
