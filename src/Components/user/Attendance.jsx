import React from "react";
import { Button } from "@mui/material";

function Attendance() {
  return (
    <>
      <Button
        size="large"
        variant="contained"
        disabled={false}
        sx={{ margin: "20px" }}
      >
        Attendance/हाजिरी
      </Button>
    </>
  );
}

export default Attendance;
