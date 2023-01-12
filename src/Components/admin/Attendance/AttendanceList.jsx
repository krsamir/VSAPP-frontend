import React from "react";
import { useGetUserAttendanceList } from "../../user/Hooks/useAttendance";
import CalendarComponent from "./CalendarComponent";

function AttendanceList() {
  const { data } = useGetUserAttendanceList();

  return (
    <div>
      <CalendarComponent data={data} />
    </div>
  );
}

export default AttendanceList;
