import { action, thunk, debug } from "easy-peasy";
import { toast } from "react-hot-toast";
import {
  getUserAttendanceList,
  approveAttendanceAPI,
} from "../Components/user/Services/Attendance.service";
import { STATUS } from "../Utilities/Constant";

export const attendanceModel = {
  attendance: [],
  addToAttendanceArray: action((state, payload) => {
    state.attendance = payload ?? [];
  }),
  updateAttendanceArray: action((state, payload) => {
    // console.log(debug((state.attendance.id[payload?.user?.id] = {})));
    // console.log(payload);
    state.attendance = state.attendance.map((data) => {
      if (data.id === payload.user.id) {
        const attendance = (data.attendance ?? []).map((val) => {
          if (payload.data.includes(val.id)) {
            return {
              ...val,
              status: true,
              ApprovedOn: payload.updationTime,
              approvedBy: payload.approver,
            };
          } else {
            return { ...val };
          }
        });
        return { ...data, attendance };
      } else {
        return { ...data };
      }
    });
    // console.log(state.attendance);
    // const userIndex = state.attendance.findIndex(
    //   (val) => val.id === payload.user.id
    // );
    // console.log(
    //   debug(
    //     state.attendance[userIndex].attendance.map((val) => {
    //       if (payload.data.includes(val.id)) {
    //         return {
    //           ...val,
    //           status: true,
    //           ApprovedOn: payload.updationTime,
    //           approvedBy: payload.approver,
    //         };
    //       } else {
    //         return { ...val };
    //       }
    //     })
    //   )
    // );
    // const data = [
    //   ...value,
    //   ...state.attendance[userIndex].attendance.map((val) => ({
    //     ...val,
    //     status: true,
    //     ApprovedOn: payload.updationTime,
    //     approvedBy: payload.approver,
    //   })),
    // ];
    // state.attendance = data;
    // console.log(debug(state.attendance));
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
  approveAttendanceThunk: thunk(
    async ({ updateAttendanceArray }, payload, { fail }) => {
      return await approveAttendanceAPI(payload)
        .then((response) => {
          const {
            data: { status, message, approver, updationTime },
          } = response;
          if (status === STATUS.SUCCESS) {
            toast.success(message);
            updateAttendanceArray({ ...payload, approver, updationTime });
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
