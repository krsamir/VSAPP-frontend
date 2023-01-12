import React, { useCallback, useState } from "react";
import Styled from "styled-components";
import moment from "moment";
import { useCalendar } from "../../user/Hooks/useAttendance";
import AttendanceDialog from "./AttendanceDialog";

const NO_OF_COLS = 3;
const Container = Styled.div`
`;

const Table = Styled.table`
&.table__main {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  margin-top: 90px;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
}

tr:nth-child(even) {
  /* background-color: #dddddd; */
}
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

function CalendarComponent({ data }) {
  const { momentDates } = useCalendar();

  const [open, setOpen] = useState(false);
  const [calendarData, setCalendarData] = useState({});

  const buildAttendanceBox = useCallback(
    (singleDate, attendance, name) =>
      attendance.map((value, index) => {
        // eslint-disable-next-line no-unused-vars
        const { markedOn, ApprovedOn, approvedBy, status, userId } = value;
        if (singleDate.isSame(markedOn) && status === true) {
          return (
            <Present
              key={index}
              onClick={() => {
                setOpen(true);
                setCalendarData({ ...value, name });
              }}
            >
              P
            </Present>
          );
        } else if (singleDate.isSame(markedOn) && status === false) {
          return (
            <NotApplicable
              key={index}
              onClick={() => {
                setOpen(true);
                setCalendarData({ ...value, name });
              }}
            >
              NA
            </NotApplicable>
          );
        } else {
          return <div key={index}></div>;
        }
      }),
    []
  );

  //   console.log(data);

  return (
    <Container>
      <Table className="table__main">
        <thead>
          <tr>
            <th>Name</th>
            {momentDates.map((v, i) => (
              <React.Fragment key={i}>
                <th>{moment(v).date()}</th>
              </React.Fragment>
            ))}
            <th>Present</th>
            <th>Applied</th>
            <th>Username</th>
          </tr>
        </thead>
        {data.length ? (
          <tbody>
            {data.map(({ id, name, username, attendance }) => {
              return (
                <tr key={id}>
                  <td>{name}</td>
                  {momentDates.map((v, i) => {
                    // console.log(attendance);
                    return (
                      <React.Fragment key={i}>
                        <td>{buildAttendanceBox(v, attendance, name)}</td>
                      </React.Fragment>
                    );
                  })}
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
        data={calendarData}
        setCalendarData={setCalendarData}
      />
    </Container>
  );
}

export default CalendarComponent;
