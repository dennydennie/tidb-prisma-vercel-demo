import { Roofing } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { getCookie } from "cookies-next";
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

export default function CreateHouseRoomsForm(props: { session: any }) {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { session } = props;
  const dispatch = useDispatch();
  const house = useSelector(selectHouseState);

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
      <DialogTitle>Add More House Details </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            sx={{ width: { lg: "50%", xs: "100%" }, mt: "1rem" }}
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
            sx={{ width: { lg: "50%", xs: "100%" }, mt: "1rem" }}
            variant="standard"
            id="bathrooms"
            name="bathrooms"
            label="Number of bathrooms"
            type="number"
            value={formik.values.bathrooms}
            onChange={formik.handleChange}
            error={formik.touched.bathrooms && Boolean(formik.errors.bathrooms)}
            helperText={formik.touched.bathrooms && formik.errors.bathrooms}
          />
          <TextField
            sx={{ width: { lg: "50%", xs: "100%" }, mt: "1rem" }}
            variant="standard"
            id="rentalFee"
            name="rentalFee"
            label="Rental Fee"
            type="number"
            value={formik.values.rentalFee}
            onChange={formik.handleChange}
            error={formik.touched.rentalFee && Boolean(formik.errors.rentalFee)}
            helperText={formik.touched.rentalFee && formik.errors.rentalFee}
          />

          <FormControl sx={{ width: { lg: "50%", xs: "100%" }, mt: "1rem" }}>
            <InputLabel sx={{ ml: "-1rem" }} id="rentalPeriod">
              Rental Period
            </InputLabel>
            <Select
              fullWidth
              labelId="rentalPeriod"
              variant="standard"
              name="rentalPeriod"
              id="rentalPeriod"
              label="Status"
              value={formik.values.rentalPeriod}
              onChange={formik.handleChange}
              error={
                formik.touched.rentalPeriod &&
                Boolean(formik.errors.rentalPeriod)
              }
            >
              <MenuItem value={"daily"}>Daily</MenuItem>
              <MenuItem value={"weekly"}>Weekly</MenuItem>
              <MenuItem value={"monthly"}>Monthly</MenuItem>
            </Select>
          </FormControl>

          <TextField
            sx={{ width: { lg: "50%", xs: "100%" }, mt: "1rem" }}
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
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Next
          </Button>
        </DialogActions>
      </form>
    </>
  );
}

export async function getServerSideProps({ res, req }: { res: any; req: any }) {
  const session = await getCookie("session", { res, req });

  console.log(session);

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
