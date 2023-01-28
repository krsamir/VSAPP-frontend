import React, { useMemo, useState, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Styled from "styled-components";
import { Table } from "../Constant";
import moment from "moment";
import { VIEW_DATE_FORMAT } from "../../../Utilities/Constant";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DownloadIcon from "@mui/icons-material/Download";

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
  margin-bottom: 5px;
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

const OptionMenu = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px 0px;
    `;
export default function AttendanceDialog({
  open = false,
  setOpen,
  momentDates,
  attendance = [],
  setCalendarData,
  userDetail = {},
}) {
  const [approvalRows, setApprovalRows] = useState([]);
  const [regularizationRows, setRegularizationRows] = useState([]);
  const [approvalData, setApprovalData] = useState([]);
  const [regularizationData, setRegularizationData] = useState([]);

  const handleClose = useCallback(() => {
    setCalendarData({});
    setOpen(false);
    setApprovalRows([]);
    setApprovalData([]);
    setRegularizationRows([]);
    setRegularizationData([]);
  }, [setCalendarData, setOpen]);

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
        moment(markedOn).isSame(date.moment)
      );
      if (index > -1) {
        const vals = attendance[index];
        return {
          ...vals,
          date: date.moment,
          isApproved: vals.status ? STATUS.PRESENT : STATUS.NA,
          position: date.position,
        };
      } else {
        return {
          date: date.moment,
          ...emptyObj,
          position: date.position,
        };
      }
    });
  }, [attendance, momentDates]);

  const notApprovedAttendance = useMemo(
    () => calendarGrid.filter((val) => val.status !== null && !val.status),
    [calendarGrid]
  );
  const emptyDates = useMemo(
    () => calendarGrid.filter((val) => val.id === null),
    [calendarGrid]
  );

  const handleCheckboxSelection = useCallback(
    (selectVal) => {
      const { id, position } = selectVal;
      if (id) {
        if (approvalRows.includes(position)) {
          // uncheck the row
          setApprovalRows(approvalRows.filter((row) => row !== position));
          setApprovalData(
            approvalData.filter((value) => value.position !== position)
          );
        } else {
          // check the row
          setApprovalRows((prev) => [...prev, position]);
          setApprovalData((prev) => [
            ...prev,
            ...calendarGrid.filter((val) => val.position === position),
          ]);
        }
      } else {
        if (regularizationRows.includes(position)) {
          // uncheck the row
          setRegularizationRows(
            regularizationRows.filter((row) => row !== position)
          );
          setRegularizationData(
            regularizationData.filter((value) => value.position !== position)
          );
        } else {
          // check the row
          setRegularizationRows((prev) => [...prev, position]);
          setRegularizationData((prev) => [
            ...prev,
            ...calendarGrid.filter((val) => val.position === position),
          ]);
        }
      }
    },
    [
      approvalData,
      approvalRows,
      calendarGrid,
      regularizationData,
      regularizationRows,
    ]
  );

  const selectAllforApproval = useCallback(() => {
    if (approvalRows.length <= 0) {
      setApprovalRows(notApprovedAttendance.map((elem) => elem.position));
      setApprovalData(notApprovedAttendance);
    } else {
      setApprovalRows([]);
      setApprovalData([]);
    }
  }, [approvalRows, notApprovedAttendance]);

  const selectAllForRegularization = useCallback(() => {
    if (regularizationRows.length <= 0) {
      setRegularizationRows(emptyDates.map((elem) => elem.position));
      setRegularizationData(emptyDates);
    } else {
      setRegularizationRows([]);
      setRegularizationData([]);
    }
  }, [emptyDates, regularizationRows]);

  const handleApproval = useCallback((value) => {
    console.log(value);
    // console.log(value);
  }, []);
  const handleRegularization = useCallback((value) => {
    console.log(value);
  }, []);
  const handleBulkApprove = useCallback(() => {
    console.log(approvalData);
  }, [approvalData]);

  const handleBulkRegularize = useCallback(() => {
    console.log(regularizationData);
  }, [regularizationData]);

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
              </div>
            </ContentBox>
            <OptionMenu>
              <Button variant="contained" onClick={selectAllforApproval}>
                <CheckIcon />
                Select All (Approval)
              </Button>
              <Button variant="contained" onClick={selectAllForRegularization}>
                <CheckIcon />
                Select All (Regularization)
              </Button>
              <Button
                variant="contained"
                disabled={approvalRows.length < 2}
                onClick={handleBulkApprove}
              >
                Bulk Approve
                {approvalRows.length > 0 && `(${approvalRows.length})`}
              </Button>
              <br />
              <Button
                variant="contained"
                disabled={regularizationRows.length < 2}
                onClick={handleBulkRegularize}
              >
                Bulk Regularize
                {regularizationRows.length > 0 &&
                  `(${regularizationRows.length})`}
              </Button>
              <Tooltip
                title="Download Excel File under progress"
                placement="top"
              >
                <Button variant="contained" disabled>
                  <DownloadIcon />
                </Button>
              </Tooltip>
            </OptionMenu>
            <Table className="table__main">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Approved By</th>
                  <th>Approved On</th>
                  <th>Action</th>
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
                      position,
                    },
                    index
                  ) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <Checkbox
                            name="single"
                            disabled={status}
                            onChange={(event) =>
                              handleCheckboxSelection({
                                id,
                                markedOn,
                                status,
                                approvedBy,
                                ApprovedOn,
                                date,
                                isApproved,
                                position,
                              })
                            }
                            checked={
                              approvalRows.includes(position) ||
                              regularizationRows.includes(position)
                            }
                          />
                        </td>
                        <td>{moment(date).format(VIEW_DATE_FORMAT)}</td>
                        <td>{isApproved}</td>
                        <td>{approvedBy}</td>
                        <td>{ApprovedOn}</td>
                        <td>
                          {status === null ? (
                            <Button
                              variant="contained"
                              sx={{ width: "125px" }}
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
                              <AddIcon />
                              Regularize
                            </Button>
                          ) : (
                            !status && (
                              <Button
                                variant="contained"
                                sx={{ width: "140px" }}
                                onClick={() =>
                                  handleRegularization({
                                    id,
                                    markedOn,
                                    status,
                                    approvedBy,
                                    ApprovedOn,
                                    date,
                                  })
                                }
                              >
                                <DoneAllIcon />
                                Approve
                              </Button>
                            )
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
