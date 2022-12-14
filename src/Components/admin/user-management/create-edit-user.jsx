import React, { useCallback, useContext, useMemo, useEffect } from "react";
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
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useForm, Controller } from "react-hook-form";
import Styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { useGetTenants } from "../../super-admin/Hooks/useTenants";
import { useCreateUser, usePatchUser } from "../Hooks/useUser";
import { ROLES, STATUS } from "../../../Utilities/Constant";
import { useCookies } from "../../Common/hooks/useCookies";
import { AdminContext } from "../Context/admin-context";
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

const ContentWrapper = Styled.div`
  height: auto;
  overflow-y: hidden;
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

const FIELD_DATA = {
  shouldTouch: true,
  shouldDirty: true,
  shouldValidate: true,
};

export default function CreateEditUserComponent() {
  const { tenants } = useStoreState((state) => state.tenant);
  useGetTenants();
  const {
    providerState: { modalState, userData, setModalState, setUserData },
  } = useContext(AdminContext);

  const { createUser } = useCreateUser();
  const { updateUserData } = usePatchUser();
  // const [open, setOpen] = React.useState(false);
  const { getCookie } = useCookies();
  const handleClickOpen = () => {
    setModalState(true);
  };
  const checkIsEdit = useMemo(
    () => Boolean(userData?.id) || false,
    [userData?.id]
  );

  const defaultFormValues = useMemo(
    () => ({
      [FIELDS.ID]: null,
      [FIELDS.NAME]: "",
      [FIELDS.USERNAME]: "",
      [FIELDS.MOBILE]: "9999999999",
      [FIELDS.IS_ACTIVE]: true,
      [FIELDS.TENANT_ID]: ``,
    }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (checkIsEdit) {
      const { name, mobile, id, isActive, tenantId, username } = userData;
      setValue(FIELDS.ID, id);
      setValue(FIELDS.NAME, name, {
        ...FIELD_DATA,
      });
      setValue(FIELDS.USERNAME, username, {
        ...FIELD_DATA,
      });
      setValue(FIELDS.IS_ACTIVE, isActive, {
        ...FIELD_DATA,
      });
      setValue(FIELDS.TENANT_ID, tenantId, {
        ...FIELD_DATA,
      });
      setValue(FIELDS.MOBILE, mobile, {
        ...FIELD_DATA,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleFieldsReset = useCallback(
    () =>
      reset({
        ...defaultFormValues,
      }),
    [defaultFormValues, reset]
  );

  const handleClose = useCallback(() => {
    setModalState(false);
    setUserData(null);
    handleFieldsReset();
  }, [handleFieldsReset, setModalState, setUserData]);

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const onSubmit = useCallback(
    (data) => {
      if (data?.id) {
        updateUserData(
          { data, userData },
          {
            onSuccess(data) {
              if (data?.data?.status === STATUS.SUCCESS) {
                handleClose();
              }
            },
          }
        );
      } else {
        delete data.id;
        createUser(data, {
          onSuccess(data) {
            if (data?.data?.status === STATUS.SUCCESS) {
              handleClose();
            }
          },
        });
      }
    },
    [createUser, handleClose, updateUserData, userData]
  );
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ marginTop: "20px", marginLeft: "20px" }}
      >
        <AddIcon />
        {getCookie(`role`) === ROLES.SUPER_ADMIN.VALUE
          ? `Create Admin`
          : `Create User`}
      </Button>
      <DialogComponent
        open={modalState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen={true}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {getCookie(`role`) === ROLES.SUPER_ADMIN.VALUE
              ? `Create Admin`
              : `Create User`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              component={"span"}
              id="alert-dialog-slide-description"
            >
              <ContentWrapper>
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
                          message: `${capitalize(
                            FIELDS.NAME
                          )} cannot be empty.`,
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
                          error={[`required`, `pattern`].includes(
                            errors?.[FIELDS.MOBILE]?.type
                          )}
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
                        pattern: {
                          value: /^[06789]\d{9}$/,
                          message: `${capitalize(
                            FIELDS.MOBILE
                          )} Number is invalid.`,
                        },
                      }}
                    />
                  </Grid>
                  {getCookie(`role`) === ROLES.SUPER_ADMIN.VALUE && (
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
                              {(tenants ?? []).map(
                                ({ id, name, status, branch }) =>
                                  status && (
                                    <MenuItem value={id} key={id}>
                                      {`${name} - ${branch}`}
                                    </MenuItem>
                                  )
                              )}
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
                  )}
                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name={FIELDS.IS_ACTIVE}
                      control={control}
                      render={({ field }) => (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch {...field} checked={field.value} />
                            }
                            label={field.value ? "Active" : "Inactive"}
                          />
                        </FormGroup>
                      )}
                    />
                  </Grid>
                </Grid>
              </ContentWrapper>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogComponent>
    </div>
  );
}
