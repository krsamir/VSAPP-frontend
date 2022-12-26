import React, { useCallback, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import Styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { useGetTenants } from "../../super-admin/Hooks/useTenants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const DialogComponent = Styled(Dialog)`
.css-m9glnp-MuiPaper-root-MuiDialog-paper{
  margin-left: 30% !important;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  margin-top: 50px;
  height: 90%;
  @media (max-width: 768px) {
    margin-left: 0% !important;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    margin-top: 0px;
    height: 100%;
  }
}
`;
const StyledFormHelperText = Styled(FormHelperText)`
  color: #d32f2f !important;
`;

const FIELDS = Object.freeze({
  ID: "id",
  NAME: "name",
  USERNAME: "username",
  MOBILE: "mobile",
  IS_ACTIVE: "isActive",
  TENANT_ID: "tenantId",
});
// Note: Admin can only create users. And Super-admin can only create admin.

export default function CreateEditUserComponent() {
  const { tenants } = useStoreState((state) => state.tenant);
  useGetTenants();
  console.log(tenants);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleFieldsReset();
  };

  const defaultFormValues = useMemo(
    () => ({
      [FIELDS.ID]: null,
      [FIELDS.NAME]: "",
      [FIELDS.USERNAME]: "",
      [FIELDS.MOBILE]: "",
      [FIELDS.IS_ACTIVE]: true,
      [FIELDS.TENANT_ID]: ``,
    }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    // setValue,
    reset,
  } = useForm({
    defaultValues: defaultFormValues,
  });

  const handleFieldsReset = useCallback(
    () =>
      reset({
        ...defaultFormValues,
      }),
    [defaultFormValues, reset]
  );

  // const FIELD_DATA = {
  //   shouldTouch: true,
  //   shouldDirty: true,
  //   shouldValidate: true,
  // };

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ marginTop: "20px" }}
      >
        Create User
      </Button>
      <DialogComponent
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen={true}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Create User</DialogTitle>
          <DialogContent>
            <DialogContentText
              component={"span"}
              id="alert-dialog-slide-description"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name={FIELDS.NAME}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={capitalize(FIELDS.NAME)}
                        variant="filled"
                        fullWidth
                        autoComplete="new-password"
                        {...field}
                        error={errors?.[FIELDS.NAME]?.type === "required"}
                        helperText={errors?.[FIELDS.NAME]?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: `${capitalize(FIELDS.NAME)} cannot be empty.`,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name={FIELDS.USERNAME}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={capitalize(FIELDS.USERNAME)}
                        variant="filled"
                        fullWidth
                        autoComplete="new-password"
                        {...field}
                        error={errors?.[FIELDS.USERNAME]?.type === "required"}
                        helperText={errors?.[FIELDS.USERNAME]?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: `${capitalize(
                          FIELDS.USERNAME
                        )} cannot be empty.`,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name={FIELDS.MOBILE}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={capitalize(FIELDS.MOBILE)}
                        variant="filled"
                        fullWidth
                        autoComplete="new-password"
                        {...field}
                        error={errors?.[FIELDS.MOBILE]?.type === "required"}
                        helperText={errors?.[FIELDS.MOBILE]?.message}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: `${capitalize(
                          FIELDS.MOBILE
                        )} Number cannot be empty.`,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name={FIELDS.TENANT_ID}
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth={true}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Tenants
                        </InputLabel>
                        <Select
                          fullWidth={true}
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label={`Tenants`}
                          {...field}
                          error={
                            errors?.[FIELDS.TENANT_ID]?.type === "required"
                          }
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <StyledFormHelperText>
                          {errors?.[FIELDS.TENANT_ID]?.message}
                        </StyledFormHelperText>
                      </FormControl>
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: `Tenant field cannot be empty.`,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name={FIELDS.IS_ACTIVE}
                    control={control}
                    render={({ field }) => (
                      <Switch {...field} checked={field.value} />
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button type="submit">Agree</Button>
          </DialogActions>
        </form>
      </DialogComponent>
    </div>
  );
}
