import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

export default function DeleteDialogComponent({
  setOpen,
  open,
  handleAccept,
  title,
  content,
  setData,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setData(null);
        }}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setData(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAccept} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteDialogComponent.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  handleAccept: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  setData: PropTypes.func,
};

DeleteDialogComponent.defaultProps = {
  setOpen: () => {},
  open: false,
  handleAccept: () => {},
  title: ``,
  content: ``,
  setData: () => {},
};
