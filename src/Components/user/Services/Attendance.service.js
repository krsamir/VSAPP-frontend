import axios from "axios";

const ATTENDANCE_BASE_URL = `/calendar`;
export const markAttendaceAPI = () => axios.get(`${ATTENDANCE_BASE_URL}/`);
export const getTodaysAttendanceAPI = (payload) =>
  axios.post(`${ATTENDANCE_BASE_URL}/date`, payload);
