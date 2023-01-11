import { useMemo } from "react";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
// import { QUERY_KEYS } from "../../../Utilities/query-keys";
import {
  markAttendaceAPI,
  getTodaysAttendanceAPI,
} from "../Services/Attendance.service";
import { STATUS } from "../../../Utilities/Constant";

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
