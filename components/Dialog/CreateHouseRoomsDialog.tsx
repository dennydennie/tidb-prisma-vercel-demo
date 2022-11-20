import { Roofing } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useFormik } from "formik";
import { Backend } from "lib/backend";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHouseState, updateHouseState } from "store/houseSlice";
import * as yup from "yup";

const validationSchema = yup.object({
  bathrooms: yup.number().required("Number of bathrooms is required"),
  rooms: yup.number().required("Number of rooms is required"),
  rentalFee: yup.number().required("Rental fee is required"),
  rentalPeriod: yup.string().required("Rental period is required"),
  securityDeposit: yup.number().notRequired(),
});

export default function CreateHouseRoomsDialog(props: { session: any }) {
  const [open, setOpen] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { session } = props;
  const dispatch = useDispatch();
  const house = useSelector(selectHouseState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      rooms: 0,
      bathrooms: 0,
      rentalFee: 0,
      securityDeposit: 0,
      rentalPeriod: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsUpdating(true);
      const token = session?.user?.accessToken;
      const payload = {
        bathrooms: Number(values.bathrooms),
        rooms: Number(values.rooms),
        securityDeposit: values.securityDeposit,
        rentalPeriod: values.rentalPeriod,
        rentalFee: values.rentalFee,
      };

      try {
        const result = dispatch(
          updateHouseState({
            bathrooms: payload.bathrooms,
            rentalFee: payload.rentalFee,
            rentalPeriod: payload.rentalPeriod,
            rooms: payload.rooms,
            securityDeposit: payload.securityDeposit,
          })
        );

        if (result) {
          router.push("/houses/other-details");
        }
        enqueueSnackbar(`Success.`, {
          variant: "success",
        });
        setIsUpdating(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Tooltip title="Add" color="error">
        <IconButton size="large" color="success" onClick={handleClickOpen}>
          <Roofing fontSize="large" color="warning" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Add More House Details </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              sx={{ width: { lg: "50%", xs: "100%" } }}
              variant="standard"
              id="rooms"
              name="rooms"
              label="Number of rooms"
              type="number"
              value={formik.values.rooms}
              onChange={formik.handleChange}
              error={formik.touched.rooms && Boolean(formik.errors.rooms)}
              helperText={formik.touched.rooms && formik.errors.rooms}
            />
            <TextField
              sx={{ width: { lg: "50%", xs: "100%" } }}
              variant="standard"
              id="bathrooms"
              name="bathrooms"
              label="Number of bathrooms"
              type="number"
              value={formik.values.bathrooms}
              onChange={formik.handleChange}
              error={
                formik.touched.bathrooms && Boolean(formik.errors.bathrooms)
              }
              helperText={formik.touched.bathrooms && formik.errors.bathrooms}
            />
            <TextField
              sx={{ width: { lg: "50%", xs: "100%" } }}
              variant="standard"
              id="rentalFee"
              name="rentalFee"
              label="Rental Fee"
              type="number"
              value={formik.values.rentalFee}
              onChange={formik.handleChange}
              error={
                formik.touched.rentalFee && Boolean(formik.errors.rentalFee)
              }
              helperText={formik.touched.rentalFee && formik.errors.rentalFee}
            />
            <TextField
              sx={{ width: { lg: "50%", xs: "100%" } }}
              variant="standard"
              id="rentalPeriod"
              name="rentalPeriod"
              label="Rental Period"
              type="text"
              value={formik.values.rentalPeriod}
              onChange={formik.handleChange}
              error={
                formik.touched.rentalPeriod &&
                Boolean(formik.errors.rentalPeriod)
              }
              helperText={
                formik.touched.rentalPeriod && formik.errors.rentalPeriod
              }
            />

            <TextField
              sx={{ width: { lg: "50%", xs: "100%" } }}
              variant="standard"
              id="securityDeposit"
              name="securityDeposit"
              label="Security Deposit"
              type="number"
              value={formik.values.securityDeposit}
              onChange={formik.handleChange}
              error={
                formik.touched.securityDeposit &&
                Boolean(formik.errors.securityDeposit)
              }
              helperText={
                formik.touched.securityDeposit && formik.errors.securityDeposit
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              variant="contained"
              fullWidth
              onClick={handleClose}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Next
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
