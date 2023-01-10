import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { QUERY_KEYS } from "../../../Utilities/query-keys";
import {
  markAttendaceAPI,
  getTodaysAttendanceAPI,
} from "../Services/Attendance.service";
import { ATTENDANCE_STATUS, STATUS } from "../../../Utilities/Constant";

// export const useMarkAttendance = () => {
//   const {} = useMutation(markAttendaceAPI, {
//     enabled: false,
//   });
//   return;
// };

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
