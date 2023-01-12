import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Styled from "styled-components";

export const TD = Styled.td`
    
`;

export default function AttendanceDialog({
  open,
  setOpen,
  data,
  setCalendarData,
}) {
  const { ApprovedOn, approvedBy, markedOn, name, status } = data || {};
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setCalendarData({});
    }, 200);
  };
  console.log(data);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {data?.name}'s Attendance
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component={`div`}>
            <table>
              <tbody>
                <tr>
                  <TD>Name</TD>
                  <TD>: {name}</TD>
                </tr>
                <tr>
                  <TD>Date</TD>
                  <TD>: {markedOn}</TD>
                </tr>
                <tr>
                  <TD>Current Status</TD>
                  <TD>: {status ? `Present` : `Not Approved/Absent`}</TD>
                </tr>
                <tr>
                  <TD>Approved By</TD>
                  <TD>: {approvedBy || "-"}</TD>
                </tr>
                <tr>
                  <TD>Approved At</TD>
                  <TD>: {ApprovedOn || "-"}</TD>
                </tr>
                {/* <th>Date</th>
                <th>Current Status</th>
                <th>Approved By</th>
                <th>Approved At</th> */}
              </tbody>
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
