import React, { useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import Styled from "styled-components";
import { Table } from "../Constant";
import moment from "moment";
import { VIEW_DATE_FORMAT } from "../../../Utilities/Constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Content = Styled.div`
  margin-top: 10px;
  padding: 20px;
`;
const STATUS = Object.freeze({
  PRESENT: "Present",
  NA: "Not Approved",
});

const ContentBox = Styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const LeftContent = Styled.div`
  flex:1;
`;

const Name = Styled.span`
  font-weight: 700;
`;

const TableContainer = Styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgb(0 0 0 / 50%);
`;

const LabelContainer = Styled.div`
  margin-top: 15px;
`;
const LabelData = Styled.span`
  margin-left: 15px;
`;
const ApproveButton = Styled.button`
    padding: 6px 15px;
    border-radius: 6px;
    outline: none;
    border: 1px solid #ededed;
    background-color: #a7f1a7;
    cursor: pointer;
    `;
export default function AttendanceDialog({
  open = false,
  setOpen,
  momentDates,
  attendance = [],
  setCalendarData,
  userDetail = {},
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const notApprovedAttendance = useMemo(
    () => attendance.filter((val) => !val.status),
    [attendance]
  );

  const handleClose = () => {
    setCalendarData({});
    setOpen(false);
    setSelectedRows([]);
    setAttendanceData([]);
  };

  const calendarGrid = useMemo(() => {
    const emptyObj = {
      markedOn: "",
      status: null,
      approvedBy: "",
      ApprovedOn: "",
      id: null,
    };
    return momentDates.map((date) => {
      const index = (attendance ?? []).findIndex(({ markedOn }) =>
        moment(markedOn).isSame(date)
      );
      if (index > -1) {
        const vals = attendance[index];
        return {
          ...vals,
          date,
          isApproved: vals.status ? STATUS.PRESENT : STATUS.NA,
        };
      } else {
        return {
          date,
          ...emptyObj,
        };
      }
    });
  }, [attendance, momentDates]);

  const handleSelect = (event, selectVal) => {
    const {
      target: { name, checked },
    } = event;
    if (name === "all") {
      // Check and uncheck all the rows
      if (checked) {
        setSelectedRows(notApprovedAttendance.map((elem) => elem.id));
        setAttendanceData(notApprovedAttendance);
      } else {
        setSelectedRows([]);
        setAttendanceData([]);
      }
    } else {
      const { id } = selectVal;
      if (selectedRows.includes(id)) {
        // uncheck the row
        setSelectedRows(selectedRows.filter((row) => row !== id));
        setAttendanceData(attendanceData.filter((value) => value.id !== id));
      } else {
        // check the row
        setSelectedRows((prev) => [...prev, id]);
        setAttendanceData((prev) => [
          ...prev,
          ...attendance.filter((val) => val.id === id),
        ]);
      }
    }
  };

  const handleApproval = (value) => {
    console.log(value);
    // console.log(value);
  };

  const handleBulkApprove = () => {
    console.log(attendanceData);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Attendance
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Content>
          <TableContainer>
            <ContentBox>
              <LeftContent>
                <LabelContainer>
                  <Name>Name:</Name>
                  <LabelData>{userDetail?.name}</LabelData>
                </LabelContainer>
                <LabelContainer>
                  <Name>Total Applied :</Name>
                  <LabelData>{attendance.length}</LabelData>
                </LabelContainer>
                <LabelContainer>
                  <Name>Not Approved (NA) :</Name>
                  <LabelData>{notApprovedAttendance.length}</LabelData>
                </LabelContainer>
              </LeftContent>
              <div>
                <LabelContainer>
                  <Name>Total Present:</Name>
                  <LabelData>
                    {attendance.filter((val) => val.status).length}
                  </LabelData>
                </LabelContainer>
                <LabelContainer>
                  <Name>Total Absent/Not Applied:</Name>
                  <LabelData>
                    {calendarGrid.length} - {attendance.length} =
                    {calendarGrid.length - attendance.length}
                  </LabelData>
                </LabelContainer>
                <Button
                  variant="contained"
                  disabled={!selectedRows.length}
                  onClick={handleBulkApprove}
                  sx={{ marginTop: "10px" }}
                >
                  Bulk Approve{" "}
                  {selectedRows.length > 0 && `(${selectedRows.length})`}
                </Button>
              </div>
            </ContentBox>
            <Table className="table__main">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleSelect}
                      name="all"
                      checked={
                        selectedRows.length === notApprovedAttendance.length
                      }
                    />
                  </th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Approved By</th>
                  <th>Approved On</th>
                  <th>Approve</th>
                </tr>
              </thead>
              <tbody>
                {calendarGrid.map(
                  (
                    {
                      id,
                      markedOn,
                      status,
                      approvedBy,
                      ApprovedOn,
                      date,
                      isApproved,
                    },
                    index
                  ) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            name="single"
                            disabled={
                              status === null || isApproved === STATUS.PRESENT
                            }
                            onChange={(event) =>
                              handleSelect(event, {
                                id,
                                markedOn,
                                status,
                                approvedBy,
                                ApprovedOn,
                                date,
                                isApproved,
                              })
                            }
                            checked={selectedRows.includes(id)}
                          />
                        </td>
                        <td>{moment(date).format(VIEW_DATE_FORMAT)}</td>
                        <td>{isApproved}</td>
                        <td>{approvedBy}</td>
                        <td>{ApprovedOn}</td>
                        <td>
                          {isApproved === STATUS.NA && (
                            <ApproveButton
                              onClick={() =>
                                handleApproval({
                                  id,
                                  markedOn,
                                  status,
                                  approvedBy,
                                  ApprovedOn,
                                  date,
                                })
                              }
                            >
                              Approve
                            </ApproveButton>
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  )
                )}
              </tbody>
            </Table>
          </TableContainer>
        </Content>
      </Dialog>
    </div>
  );
}
