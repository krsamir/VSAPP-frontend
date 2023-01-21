import axios from "axios";

const ATTENDANCE_BASE_URL = `/calendar`;

export const markAttendaceAPI = () => axios.post(`${ATTENDANCE_BASE_URL}`);

export const getTodaysAttendanceAPI = (payload) =>
  axios.post(`${ATTENDANCE_BASE_URL}/date`, payload);

export const getUserAttendanceList = ({ month, year }) =>
  axios.get(`${ATTENDANCE_BASE_URL}/users?month=${month}&year=${year}`);
