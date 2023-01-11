import React, { useEffect } from "react";
import { Button } from "@mui/material";
import {
  useGetTodaysAttendance,
  useMarkAttendance,
} from "./Hooks/useAttendance";
import moment from "moment";
import { ATTENDANCE_STATUS, STATUS } from "../../Utilities/Constant";
import Loader from "../Common/Loader/Loader";
import Styled from "styled-components";

const Table = Styled.table`
  &.main {
  border-collapse: collapse;
  margin-left:20px
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
`;

function Attendance() {
  const { getTodaysAttendance, data, isLoading } = useGetTodaysAttendance();
  const { markAttendance, data: attendanceData } = useMarkAttendance();

  useEffect(() => {
    getTodaysAttendance({ date: moment().format("YYYY-MM-DD") });
  }, [getTodaysAttendance]);
  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Button
          size="large"
          variant="contained"
          disabled={
            (data?.data?.attendance === ATTENDANCE_STATUS.DONE &&
              STATUS.SUCCESS === data?.data?.status) ||
            attendanceData?.data.status === STATUS.SUCCESS
          }
          sx={{ margin: "20px", width: "300px", height: "150px" }}
          onClick={markAttendance}
        >
          Attendance
        </Button>
      )}
      {data?.data?.data && (
        <Table className="main">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Status</th>
              <th>Approver</th>
              <th>Date</th>
            </tr>
            <tr>
              <td>1</td>
              <td>{data?.data?.data.status}</td>
              <td>{data?.data?.data.approvedBy}</td>
              <td>{data?.data?.data.ApprovedOn}</td>
            </tr>
          </thead>
        </Table>
      )}
    </React.Fragment>
  );
}

export default Attendance;
