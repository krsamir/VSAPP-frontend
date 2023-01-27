import { action, thunk } from "easy-peasy";
import { toast } from "react-hot-toast";
import { getUserAttendanceList } from "../Components/user/Services/Attendance.service";
import { STATUS } from "../Utilities/Constant";

export const attendanceModel = {
  attendance: [],
  addToAttendanceArray: action((state, payload) => {
    state.attendance = payload ?? [];
  }),
  fetchAttendanceList: thunk(
    async ({ addToAttendanceArray }, payload, { fail }) => {
      return await getUserAttendanceList(payload)
        .then((response) => {
          const {
            data: { status, data, message },
          } = response;
          if (status === STATUS.SUCCESS) {
            addToAttendanceArray(data);
          } else {
            toast.error(message);
          }
          return response;
        })
        .catch((e) => {
          fail(e);
          throw new Error(e);
        });
    }
  ),
};
