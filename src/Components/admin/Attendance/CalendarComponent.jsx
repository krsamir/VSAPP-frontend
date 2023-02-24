import React, { useCallback, useState } from "react";
import Styled from "styled-components";
import AttendanceDialog from "./AttendanceDialog";
import { Table } from "../Constant";

const NO_OF_COLS = 3;
const Container = Styled.div`
padding: 0 20px;
`;

const TableHeader = Styled.span`
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 600;
    background-color: aliceblue;
    padding: 6px 10px;
    border-radius: 6px;
    display: inline-block;
`;
function CalendarComponent({ data, momentDates = [] }) {
  // console.log(data);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(null);

  const handleDataInput = useCallback((_index) => {
    setIndex(_index);
    setOpen(true);
  }, []);

  // console.log(calendarData);
  return (
    <Container>
      <TableHeader>
        Total days this month: {(momentDates ?? []).length}
      </TableHeader>
      <Table className="table__main">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Total Applied</th>
            <th>Total Present</th>
            <th>Not Approved(NA)</th>
            <th>Total Absent</th>
          </tr>
        </thead>
        {data.length ? (
          <tbody>
            {data.map((attendanceData, index) => {
              const { id, name, username, attendance } = attendanceData;
              return (
                <tr
                  key={id}
                  onClick={() => handleDataInput(index)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{(attendance ?? []).length}</td>
                  <td>
                    {(attendance ?? []).filter(({ status }) => status).length}
                  </td>
                  <td>
                    {(attendance ?? []).filter(({ status }) => !status).length}
                  </td>
                  <td>{momentDates.length - (attendance ?? []).length}</td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={NO_OF_COLS}>No data</td>
            </tr>
          </tbody>
        )}
      </Table>
      <AttendanceDialog
        setOpen={setOpen}
        open={open}
        momentDates={momentDates}
        value={data}
        index={index}
        setIndex={setIndex}
      />
    </Container>
  );
}

export default CalendarComponent;
