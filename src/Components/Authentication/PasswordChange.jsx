import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Login.css";
import { useChangePassword } from "./Hooks/useAuthenticationHook";
import { STATUS } from "../../Utilities/Constant";
export default function ChangePassword() {
  const { changePassword } = useChangePassword();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    username: "",
    otp: "",
    password: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData({
      username: "",
      otp: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const value = { ...data };
    value[e.target.name] = e.target.value;
    setData(value);
  };
  const handleSave = () => {
    changePassword(data, {
      onSuccess(response) {
        const {
          data: { status },
        } = response;
        if (status === STATUS.SUCCESS) {
          handleClose();
        }
      },
    });
  };

  return (
    <div>
      <div className="forgotPassword" onClick={handleClickOpen}>
        Change Password (पासवर्ड बदलें) ?
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password (पासवर्ड बदलें)</DialogTitle>
        <DialogContent>
          <DialogContentText component={"div"}>
            <div className="hindi">पासवर्ड बदलने का तरीका:</div>
            <ul>
              <li>अपने एडमिन से ओटीपी मांगें।</li>
              <li>अपना उपयोगकर्ता नाम और ओटीपी प्रदान करें।</li>
              <li>
                सही ओटीपी डालकर आप अपना पासवर्ड बदलने के लिए आगे बढ़ सकते हैं।
              </li>
            </ul>
            <div className="english">Method of changing password:</div>
            <ul>
              <li>Ask for OTP from your admin.</li>
              <li>Provide your username and OTP.</li>
              <li>
                By putting correct OTP you can proceed with changing your
                password.
              </li>
            </ul>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="User Name (उपयोगकर्ता नाम)"
            fullWidth
            variant="filled"
            autoComplete="new-password"
            onChange={handleChange}
            value={data.username}
          />
          <TextField
            autoFocus
            margin="dense"
            name="otp"
            label="OTP (ओटीपी)"
            fullWidth
            variant="filled"
            autoComplete="new-password"
            onChange={handleChange}
            value={data.otp}
          />
          <TextField
            autoFocus
            margin="dense"
            name="password"
            label="Password (पासवर्ड/कुंजिका)"
            fullWidth
            variant="filled"
            autoComplete="new-password"
            onChange={handleChange}
            value={data.password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel (रद्द करें)</Button>
          {/* <Button onClick={handleCheck}>Check (जाँच करें)</Button> */}
          <Button onClick={handleSave}>Change (बदलें)</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
