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
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { Backend } from "lib/backend";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import houseSlice, {
  selectHouseState,
  updateHouseState,
} from "store/houseSlice";
import * as yup from "yup";

const validationSchema = yup.object({});

export default function CreateHouseOtherDetailsDialog() {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const session = getCookie("session");
  const house = useSelector(selectHouseState);

  const formik = useFormik({
    initialValues: {
      hasCouncilWater: false,
      hasElectricity: false,
      isRequest: false,
      isSharing: false,
      hasBoreholeWater: false,
      hasBackupElectricity: false,
      hasParking: false,
      isTilled: false,
      isWalled: false,
      hasOwnEntrance: false,
      hasCelling: false,
      hasBuiltInCupboards: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsUpdating(true);

        const res = await Backend({
          payload: {
            sharing: house.isSharing,
            ...house,
            ...values,
          },
          params: null,
          action: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: session,
          },
          endPoint: "/houses",
        });
        const id = res?.data.id;

        await dispatch(
          updateHouseState({
            ...house,
            ...values,
          })
        );
        setIsUpdating(false);
        router.push({
          pathname: "upload-photo",
          query: {
            houseId: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <DialogTitle>Add More Details</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.hasElectricity} />}
            name="hasElectricity"
            id="hasElectricity"
            value={formik.values.hasElectricity}
            onChange={formik.handleChange}
            label="Electricity"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.hasCouncilWater} />}
            name="hasCouncilWater"
            id="hasCouncilWater"
            value={formik.values.hasCouncilWater}
            onChange={formik.handleChange}
            label="Water"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.isRequest} />}
            name="isRequest"
            id="isRequest"
            value={formik.values.isRequest}
            onChange={formik.handleChange}
            label="Request"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.isSharing} />}
            name="isSharing"
            id="isSharing"
            value={formik.values.isSharing}
            onChange={formik.handleChange}
            label="Sharing"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.hasBoreholeWater} />}
            name="hasBoreholeWater"
            id="hasBoreholeWater"
            value={formik.values.hasBoreholeWater}
            onChange={formik.handleChange}
            label="Borehole"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.hasBackupElectricity} />}
            name="hasBackupElectricity"
            id="hasBackupElectricity"
            value={formik.values.hasBackupElectricity}
            onChange={formik.handleChange}
            label="Backup Power"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.hasParking} />}
            name="hasParking"
            id="hasParking"
            value={formik.values.hasParking}
            onChange={formik.handleChange}
            label="Parking"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.isTilled} />}
            name="isTilled"
            id="isTilled"
            value={formik.values.isTilled}
            onChange={formik.handleChange}
            label="Tilled"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.isWalled} />}
            name="isWalled"
            id="isWalled"
            value={formik.values.isWalled}
            onChange={formik.handleChange}
            label="Walled"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.hasOwnEntrance} />}
            name="hasOwnEntrance"
            id="hasOwnEntrance"
            value={formik.values.hasOwnEntrance}
            onChange={formik.handleChange}
            label="Own Entrance"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.hasCelling} />}
            name="hasCelling"
            id="hasCelling"
            value={formik.values.hasCelling}
            onChange={formik.handleChange}
            label="Celling"
          />

          <FormControlLabel
            sx={{ width: { lg: "30%", xs: "100%" } }}
            control={<Checkbox checked={formik.values.hasBuiltInCupboards} />}
            name="hasBuiltInCupboards"
            id="hasBuiltInCupboards"
            value={formik.values.hasBuiltInCupboards}
            onChange={formik.handleChange}
            label="Cupboards"
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

export async function getServerSideProps(context: any) {
  const session = await getCookie("session");

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
