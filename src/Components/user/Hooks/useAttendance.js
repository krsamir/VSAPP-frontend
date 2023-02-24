import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useStoreActions } from "easy-peasy";
import { toast } from "react-hot-toast";
import { QUERY_KEYS } from "../../../Utilities/query-keys";
import {
  markAttendaceAPI,
  getTodaysAttendanceAPI,
} from "../Services/Attendance.service";
import { STATUS, QUERY_DATE_FORMAT } from "../../../Utilities/Constant";
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

export const useGetUserAttendanceList = (
  month = moment().month() + 1,
  year = moment().year()
) => {
  const { fetchAttendanceList } = useStoreActions((store) => store.attendance);
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_ATTENDANCE, month, year],
    () => fetchAttendanceList({ month, year }),
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

export const useCalendar = (
  month = moment().month() + 1,
  year = moment().year()
) => {
  const selectedDate = `${year}-${month}-01`;
  const date = moment(selectedDate, QUERY_DATE_FORMAT);
  const currentMonth = date.clone().month() + 1;
  const currentYear = date.clone().year();
  const endOfThisMonth = date.clone().endOf(`month`).date();
  const momentDates = Array.from({ length: endOfThisMonth }, (_, i) => ({
    moment: moment(
      `${currentYear}-${currentMonth > 9 ? currentMonth : "0" + currentMonth}-${
        i > 8 ? i + 1 : "0" + (i + 1)
      }`
    ),
    position: i,
  }));
  return useMemo(() => ({ momentDates }), [momentDates]);
};

export const useApproveAttendance = () => {
  const { approveAttendanceThunk } = useStoreActions(
    (store) => store.attendance
  );
  const { mutate: approveAttendance } = useMutation(approveAttendanceThunk, {
    onError(e) {
      console.log(e);
      toast.error(`Issue while approving attendance.`);
    },
  });
  return useMemo(() => ({ approveAttendance }), [approveAttendance]);
};
