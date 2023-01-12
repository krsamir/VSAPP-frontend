import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { QUERY_KEYS } from "../../../Utilities/query-keys";
import {
  markAttendaceAPI,
  getTodaysAttendanceAPI,
  getUserAttendanceList,
} from "../Services/Attendance.service";
import { STATUS } from "../../../Utilities/Constant";
import moment from "moment";

export const useMarkAttendance = () => {
  const { mutate: markAttendance, data } = useMutation(markAttendaceAPI, {
    onSuccess(data) {
      if (data?.data.status === STATUS.SUCCESS) {
        toast.success(data?.data.message);
      } else {
        toast.error(data?.data.message);
      }
    },
    onError(e) {
      console.log(e);
      toast.error(`Issue while marking attendance.`);
    },
  });
  return useMemo(() => ({ markAttendance, data }), [data, markAttendance]);
};

export const useGetTodaysAttendance = () => {
  const {
    mutate: getTodaysAttendance,
    data,
    isLoading,
  } = useMutation(getTodaysAttendanceAPI, {
    onSuccess(data) {
      const {
        data: { message, status },
      } = data;
      if (status === STATUS.FAILURE) {
        toast.error(message);
      }
      if (status === STATUS.SUCCESS) {
        toast.success(message);
      }
    },
    onError(e) {
      toast.error(`Some issue while getting today's attendance status.`);
    },
  });
  return useMemo(
    () => ({
      getTodaysAttendance,
      data,
      isLoading,
    }),
    [data, getTodaysAttendance, isLoading]
  );
};

export const useGetUserAttendanceList = () => {
  const { data, isLoading } = useQuery(
    QUERY_KEYS.GET_ATTENDANCE,
    getUserAttendanceList,
    {
      onError(e) {
        console.log(e);
        toast.error(`Issue while fetching Attendance List.`);
      },
    }
  );

  return useMemo(
    () => ({ data: data?.data?.data ?? [], isLoading }),
    [data, isLoading]
  );
};

export const useCalendar = () => {
  // const testDate = `2023-02-01`;
  const date = moment();
  const currentMonth = date.clone().month() + 1;
  const currentYear = date.clone().year();
  // const startOfThisMonth = date.clone().startOf(`month`).date();
  const endOfThisMonth = date.clone().endOf(`month`).date();
  const momentDates = Array.from({ length: endOfThisMonth }, (_, i) =>
    moment(
      `${currentYear}-${currentMonth > 9 ? currentMonth : "0" + currentMonth}-${
        i > 8 ? i + 1 : "0" + (i + 1)
      }`
    )
  );
  // console.log({
  //   currentMonth,
  //   currentYear,
  //   startOfThisMonth,
  //   endOfThisMonth,
  //   momentDates,
  // });

  return useMemo(() => ({ momentDates }), [momentDates]);
};
