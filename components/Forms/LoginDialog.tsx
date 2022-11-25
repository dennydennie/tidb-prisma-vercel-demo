import EditIcon from "@mui/icons-material/Edit";
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
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  csrfToken: yup.string(),
});

export default function LoginForm() {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      csrfToken: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsUpdating(true);

      const res = await Backend({
        endPoint: "/auth/login",
        action: "post",
        params: null,
        payload: values,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res?.status !== 200) {
        enqueueSnackbar(`Invalid login details.`, {
          variant: "error",
        });
      } else {
        setCookie("session", res.data.token);
        setIsUpdating(false);
      }

      setIsUpdating(false);
    },
  });

  return (
    <>
      <div>
        <DialogTitle>Login</DialogTitle>
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
          <TextField
            fullWidth
            variant="standard"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

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
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
