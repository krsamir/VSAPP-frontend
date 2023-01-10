import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useGetTodaysAttendance } from "./Hooks/useAttendance";
import moment from "moment";
import { ATTENDANCE_STATUS, STATUS } from "../../Utilities/Constant";
import Loader from "../Common/Loader/Loader";
function Attendance() {
  const { getTodaysAttendance, data, isLoading } = useGetTodaysAttendance();
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
            data?.data?.attendance === ATTENDANCE_STATUS.DONE &&
            STATUS.SUCCESS === data?.data?.status
          }
          sx={{ margin: "20px", width: "300px", height: "150px" }}
        >
          Attendance
        </Button>
      )}
    </React.Fragment>
  );
}

export default Attendance;
