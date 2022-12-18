import React, { useContext, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  TextField,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { SuperAdminContext } from "../Context/super-admin-context";
import { useCreateTenants } from "../Hooks/useTenants";
import { STATUS } from "../../../Utilities/Constant";

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

const FIELDS = Object.freeze({
  ID: "id",
  NAME: "name",
  BRANCH: "branch",
  STATUS: "status",
});

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

export default function CreateTenantComponent() {
  const {
    providerState: { tenantData, open, setModalState, setTenantData },
  } = useContext(SuperAdminContext);
  const { createTenant } = useCreateTenants();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      [FIELDS.ID]: null,
      [FIELDS.NAME]: "",
      [FIELDS.BRANCH]: "",
      [FIELDS.STATUS]: true,
    },
  });

  const checkIsEdit = useCallback(
    () => Boolean(tenantData?.id) || false,
    [tenantData]
  );

  const fieldData = {
    shouldTouch: true,
    shouldDirty: true,
    shouldValidate: true,
  };
  useEffect(() => {
    if (checkIsEdit()) {
      const { name, branch, id, status } = tenantData;
      setValue(FIELDS.ID, id);
      setValue(FIELDS.NAME, name, {
        ...fieldData,
      });
      setValue(FIELDS.BRANCH, branch, {
        ...fieldData,
      });
      setValue(FIELDS.STATUS, status, {
        ...fieldData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantData]);
  useEffect(() => {
    if (!open) {
      handleFieldsReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClickOpen = useCallback(
    () => setModalState(true),
    [setModalState]
  );
  const handleClose = useCallback(() => {
    setModalState(false);
    setTenantData({});
  }, [setModalState, setTenantData]);

  const handleFieldsReset = useCallback(
    () =>
      reset({
        [FIELDS.ID]: null,
        [FIELDS.NAME]: "",
        [FIELDS.BRANCH]: "",
        [FIELDS.STATUS]: true,
      }),
    [reset]
  );
  const onSubmit = useCallback(
    (data) => {
      if (data?.id) {
        // update existing value
      } else {
        // create new entry
        delete data.id;
        createTenant(data, {
          onSuccess(data) {
            if (data?.data?.status === STATUS.SUCCESS) {
              handleClose();
              handleFieldsReset();
            }
          },
        });
      }
    },
    [createTenant, handleClose, handleFieldsReset]
  );
  console.log(checkIsEdit());
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
                  <Controller
                    name={FIELDS.NAME}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={FIELDS.NAME}
                        variant="filled"
                        fullWidth
                        {...field}
                        error={errors?.[FIELDS.NAME]?.type === "required"}
                        helperText={errors?.[FIELDS.NAME]?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: `${[FIELDS.NAME]} cannot be empty.`,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={FIELDS.BRANCH}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={FIELDS.BRANCH}
                        variant="filled"
                        fullWidth
                        {...field}
                        error={errors?.[FIELDS.BRANCH]?.type === "required"}
                        helperText={errors?.[FIELDS.BRANCH]?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: `${[FIELDS.BRANCH]} cannot be empty.`,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {checkIsEdit() && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={FIELDS.STATUS}
                      control={control}
                      render={({ field }) => (
                        <Switch {...field} defaultChecked />
                      )}
                    />
                  </Grid>
                </Grid>
              )}
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
