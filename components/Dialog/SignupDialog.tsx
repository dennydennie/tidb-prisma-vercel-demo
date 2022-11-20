import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Backend } from "lib/backend";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().min(2, "Name is too short").required("Name is required"),
  phone: yup
    .string()
    .min(10, "Phone number is too short")
    .required("Phone Number is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  cpassword: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function SignupFormDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
      phone: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsUpdating(true);

      const data = {
        ...values,
        cpassword: undefined,
      };

      try {
        const res = await Backend({
          payload: data,
          endPoint: "/auth/register",
          action: "post",
          params: null,
          headers: { "Content-Type": "application/json" },
        });
        if (res?.data) {
          enqueueSnackbar(`Success.`, {
            variant: "success",
          });
          router.push("/");
          setIsUpdating(false);
        }
      } catch (error) {
        enqueueSnackbar(`Invalid login details.`, {
          variant: "error",
        });
      }
    },
  });

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
      </IconButton>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Account</DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                id="name"
                name="name"
                variant="standard"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="phone"
                variant="standard"
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                variant="standard"
                id="cpassword"
                name="cpassword"
                label="Confirm Password"
                type="password"
                value={formik.values.cpassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.cpassword && Boolean(formik.errors.cpassword)
                }
                helperText={formik.touched.cpassword && formik.errors.cpassword}
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
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}
