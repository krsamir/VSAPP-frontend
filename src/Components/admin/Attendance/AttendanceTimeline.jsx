import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Styled from "styled-components";

const Container = Styled.div`
        width:100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 20px;
    `;
const YearBox = Styled.div`
    margin: 0 25px; 
    `;

function AttendanceTimeline({
  handleMonth,
  handleYear,
  month,
  year,
  monthArray = [],
  yearArray = [],
}) {
  return (
    <Container>
      <FormControl sx={{ width: "200px", marginTop: "20px" }}>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Month"
          onChange={handleMonth}
        >
          {monthArray.map(({ id, name, value }) => (
            <MenuItem key={id} value={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <YearBox className="year">
        {" "}
        <FormControl sx={{ width: "200px", marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Year"
            onChange={handleYear}
          >
            {yearArray.map(({ id, value }) => (
              <MenuItem key={id} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </YearBox>
    </Container>
  );
}

export default AttendanceTimeline;
