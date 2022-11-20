import { Roofing } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { updateHouseState } from "store/houseSlice";
import * as yup from "yup";

const validationSchema = yup.object({
  city: yup
    .string()
    .min(3, "City should be of minimum 3 characters length")
    .required("City is required"),
  location: yup
    .string()
    .min(3, "Location should be of minimum 3 characters length")
    .required("Location is required"),
  street: yup
    .string()
    .min(3, "Street should be of minimum 3 characters length")
    .required("Street is required"),
  houseNumber: yup.string().required("House number is required"),
  status: yup.string().required("House availability is required"),
});

export default function CreateHouseAddressDialog(props: { session: any }) {
  const [open, setOpen] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { session } = props;
  const dispatch = useDispatch();

  if (!session) {
    router.push("/login");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      city: "",
      location: "",
      street: "",
      houseNumber: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        city: values.city,
        houseNumber: values.houseNumber,
        location: values.location,
        status: values.status,
        street: values.street,
      };

      try {
        await dispatch(
          updateHouseState({
            address: {
              city: payload.city,
              location: payload.location,
              street: payload.street,
              houseNumber: payload.houseNumber,
            },
            status: payload.status,
          })
        );

        enqueueSnackbar(`Success.`, {
          variant: "success",
        });
        router.push("/houses/rooms");

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
        <DialogTitle>Add House</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              sx={{ mt: "0.5rem" }}
              variant="standard"
              id="city"
              name="city"
              label="City"
              type="text"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              fullWidth
              sx={{ mt: "0.5rem" }}
              variant="standard"
              id="location"
              name="location"
              label="Location"
              type="text"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
              fullWidth
              sx={{ mt: "0.5rem" }}
              variant="standard"
              id="street"
              name="street"
              label="Street"
              type="text"
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
            <TextField
              fullWidth
              sx={{ mt: "0.5rem" }}
              variant="standard"
              id="houseNumber"
              name="houseNumber"
              label="House Number"
              type="text"
              value={formik.values.houseNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.houseNumber && Boolean(formik.errors.houseNumber)
              }
              helperText={
                formik.touched.houseNumber && formik.errors.houseNumber
              }
            />
            <FormControl fullWidth sx={{ mt: "1rem" }}>
              <InputLabel sx={{ ml: "-1rem" }} id="status">
                Status
              </InputLabel>
              <Select
                fullWidth
                labelId="status"
                variant="standard"
                name="status"
                id="status"
                label="Status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                <MenuItem value={"available"}>Available</MenuItem>
                <MenuItem value={"taken"}>Taken</MenuItem>
              </Select>
            </FormControl>
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
