// react
import { useEffect, useState } from "react";
// @mui
import { Alert, Button, DialogActions, Grid, Snackbar } from "@mui/material";
//libs
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import { FormProvider, RHFTextField } from "../hook-form";
import { Loader } from "../components";
import { axiosInstance } from "../utils";
// ----------------------------------------------------------------------

FarmerForm.propTypes = {
  setOpenDialogue: PropTypes.func,
  openDialogue: PropTypes.string,
  getData: PropTypes.func,
  farmerId: PropTypes.string,
  setFarmerId: PropTypes.func,
};
export default function FarmerForm({
  setOpenDialogue,
  openDialogue,
  getData,
  farmerId,
  setFarmerId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const LoginSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(50, "maximum 50 characters allowed")
      .min(3, "min 3 characters required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid")
      .max(50, "maximum 50 characters allowed"),
    uniqueRegNumber: Yup.string()
      .required("UID is required")
      .max(20, "Maximum 20 characters allowed")
      .min(3, "min 3 characters required"),
    landOwned: Yup.number()
      .nullable()
      .typeError("Land Owned must be a number")
      .required("Email is required")
      .min(1, "Minimum 1 hectare required")
      .max(10000, "Maximum 10000 ha allowed"),
    city: Yup.string()
      .required("City is required")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed"),
    state: Yup.string()
      .required("State is required")
      .min(3, "Minimum 3 characters required")
      .max(50, "maximum 50 characters allowed"),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .max(10, "Maximum 10 characters allowed")
      .min(10, "Minimum 10 characters required"),
  });

  const defaultValues = {
    email: "",
    name: "",
    uniqueRegNumber: "",
    landOwned: 0,
    city: "",
    state: "",
    mobileNumber: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (farmerId) {
      const { mobileNumber, uniqueRegNumber, ...updatedData } = data;
      axiosInstance
        .patch(`/farmers/${farmerId}`, updatedData)
        .then((resp) => {
          handleSnackbarOpen("Farmer updated successfully", "success");
          setOpenDialogue("");
          setFarmerId("");
          getData();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          handleSnackbarOpen(error.message, "error");
          setIsLoading(false);
        });
    } else {
      axiosInstance
        .post("/farmers", data)
        .then((resp) => {
          console.log(resp);

          reset();
          handleSnackbarOpen("Farmer added successfully", "success");
          setOpenDialogue("");
          getData();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          handleSnackbarOpen(error.message, "error");
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (farmerId) {
      axiosInstance.get(`/farmers/${farmerId}`).then((resp) => {
        if (resp.data) {
          methods.reset({
            email: resp?.data?.email,
            name: resp?.data?.name,
            uniqueRegNumber: resp?.data?.uniqueRegNumber,
            landOwned: resp?.data?.landOwned,
            city: resp?.data?.city,
            state: resp?.data?.state,
            mobileNumber: resp?.data?.mobileNumber,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmerId, openDialogue]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ pt: 1 }} spacing={2}>
          {/* {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}&nbsp;</Alert>
          )} */}

          <Grid item xs={6}>
            <RHFTextField name="name" label="Full name" />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField
              disabled={!!farmerId}
              name="uniqueRegNumber"
              label="UID"
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="email" label="Email" />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              disabled={farmerId}
              name="mobileNumber"
              label="Mobile Number"
            />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField name="landOwned" label="Land (ha)" />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField name="city" label="City" />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField name="state" label="State" />
          </Grid>
          <DialogActions sx={{ justifyContent: "flex-end", width: "100%" }}>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              sx={{ mr: 1 }}
              disabled={isLoading}
              startIcon={
                isLoading && (
                  <Loader style={{ align: "center", height: 30, width: 80 }} />
                )
              }
            >
              {isLoading ? "" : "Submit"}
            </Button>
          </DialogActions>
        </Grid>
      </FormProvider>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
