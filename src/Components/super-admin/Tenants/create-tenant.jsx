import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, TextField } from "@mui/material";
import Styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { SuperAdminContext } from "../Context/super-admin-context";
const Wrapper = Styled.div`
    width: auto;
    overflow: hidden;
`;

const StyledButton = Styled(Button)`
    margin-top: 20px !important;
    margin-left: 20px !important;
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModelComponent() {
  const {
    providerState: { tenantData, open, setModalState, setTenantData },
  } = useContext(SuperAdminContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      id: null,
      name: "",
      branch: "",
    },
  });
  const fieldData = {
    shouldTouch: true,
    shouldDirty: true,
    shouldValidate: true,
  };
  useEffect(() => {
    if (tenantData?.id) {
      const { name, branch, id } = tenantData;
      setValue("id", id);
      setValue("name", name, {
        ...fieldData,
      });
      setValue("branch", branch, {
        ...fieldData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantData]);
  useEffect(() => {
    if (!open) {
      reset({ id: null, name: "", branch: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClickOpen = () => {
    setModalState(true);
  };
  const handleClose = () => {
    setModalState(false);
    setTenantData({});
  };
  const onSubmit = (data) => {
    if (data?.id) {
      // update existing value
      console.log(`edit`);
    } else {
      // create new entry
      console.log(`new`);
    }
    handleClose();
    reset({ id: null, name: "", branch: "" });
  };

  return (
    <div>
      <StyledButton variant="outlined" onClick={handleClickOpen}>
        Add Tenant
      </StyledButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Add Tenant
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Wrapper>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {" "}
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Name"
                        variant="filled"
                        fullWidth
                        {...field}
                        error={errors?.name?.type === "required"}
                        helperText={errors?.name?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: "Name cannot be empty.",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="branch"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Branch"
                        variant="filled"
                        fullWidth
                        {...field}
                        error={errors?.branch?.type === "required"}
                        helperText={errors?.branch?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: "Branch cannot be empty.",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Wrapper>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
