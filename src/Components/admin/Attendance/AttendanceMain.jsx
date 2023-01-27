import React, { useState } from "react";
import moment from "moment";
import {
  useCalendar,
  useGetUserAttendanceList,
} from "../../user/Hooks/useAttendance";
import AttendanceTimeline from "./AttendanceTimeline";
import CalendarComponent from "./CalendarComponent";
import { MONTHS, YEAR_LIST } from "../Constant";
import { useStoreState } from "easy-peasy";
function AttendanceList() {
  const [month, setMonth] = useState(moment().month() + 1);
  const [year, setYear] = useState(moment().year());
  const handleMonth = (e) => setMonth(e.target.value);
  const handleYear = (e) => setYear(e.target.value);

  useGetUserAttendanceList(month, year);
  const { attendance: data } = useStoreState((state) => state.attendance);
  const { momentDates } = useCalendar(month, year);
  return (
    <div>
      <AttendanceTimeline
        handleMonth={handleMonth}
        handleYear={handleYear}
        month={month}
        year={year}
        monthArray={MONTHS}
        yearArray={YEAR_LIST}
      />
      <CalendarComponent data={data} momentDates={momentDates} />
    </div>
  );
}

export default AttendanceList;
