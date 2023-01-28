import React, { useCallback, useState } from "react";
import Styled from "styled-components";
import moment from "moment";
import AttendanceDialog from "./AttendanceDialog";
import { Table } from "../Constant";

const NO_OF_COLS = 3;
const Container = Styled.div`
padding: 0 20px;
`;

const SingleCell = Styled.div`
    padding: 10px;
`;
const NotApplicable = Styled(SingleCell)`
    background-color: yellow;
`;
const Present = Styled(SingleCell)`
    background-color: #5bd35b;
`;

function CalendarComponent({ data, momentDates }) {
  const [open, setOpen] = useState(false);
  const [calendarData, setCalendarData] = useState({});

  const buildAttendanceGrid = useCallback(
    (singleDate, userData) =>
      (userData ?? []).attendance.map((value, index) => {
        // eslint-disable-next-line no-unused-vars
        const { markedOn, ApprovedOn, approvedBy, status, userId } = value;
        if (singleDate.isSame(markedOn) && status === true) {
          return <Present key={index}>P</Present>;
        } else if (singleDate.isSame(markedOn) && status === false) {
          return <NotApplicable key={index}>NA</NotApplicable>;
        } else {
          return <div key={index}></div>;
        }
      }),
    []
  );

  //   console.log(data);
  const handleDataInput = (attendanceData) => {
    setOpen(true);
    setCalendarData(attendanceData);
  };
  return (
    <Container>
      <Table className="table__main">
        <thead>
          <tr>
            <th>Name</th>
            {momentDates.map((v, i) => (
              <React.Fragment key={i}>
                <th>{moment(v.moment).date()}</th>
              </React.Fragment>
            ))}
            <th>Present</th>
            <th>Applied</th>
            <th>Username</th>
          </tr>
        </thead>
        {data.length ? (
          <tbody>
            {data.map((attendanceData) => {
              const { id, name, username, attendance } = attendanceData;
              return (
                <tr
                  key={id}
                  onClick={() => handleDataInput(attendanceData)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{name}</td>
                  {momentDates.map((v, i) => (
                    <React.Fragment key={i}>
                      <td>{buildAttendanceGrid(v.moment, attendanceData)}</td>
                    </React.Fragment>
                  ))}
                  <td>
                    {(attendance ?? []).filter(({ status }) => status).length}
                  </td>
                  <td>{(attendance ?? []).length}</td>
                  <td>{username}</td>
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
        attendance={calendarData.attendance ?? []}
        userDetail={calendarData}
        setCalendarData={setCalendarData}
        momentDates={momentDates}
      />
    </Container>
  );
}

export default CalendarComponent;
