import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { Backend } from "lib/backend";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .min(15, "Email address too short")
    .required("Email address is required"),
});

export default function ForgotPasswordDialog() {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setIsUpdating(true);

      const res = await Backend({
        endPoint: "/auth/forgot-password",
        action: "post",
        params: null,
        payload: values,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res?.status === 200) {
        setCookie("session", res.data.token);
        setIsUpdating(false);
        router.push("/");
      } else {
        enqueueSnackbar(`Invalid email .`, {
          variant: "error",
        });

        setIsUpdating(false);
      }
    },
  });

  return (
    <>
      <div>
        <DialogTitle>Forgot Password</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            variant="standard"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <DialogActions>
            <Button
              color="error"
              variant="contained"
              fullWidth
              onClick={handleClose}
              disabled={isUpdating}
              sx={{ marginY: 3 }}
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
        <Typography
          sx={{ textDecoration: "underline", textUnderlineOffset: 1 }}
        >
          <a href={"/login"}>Go to login</a>
        </Typography>
      </div>
    </>
  );
}
