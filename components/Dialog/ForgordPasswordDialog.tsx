import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Router from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";

import { ForgotPassword } from "const";
import { forgotPassword } from "lib/http";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    const forgotPasswordData: ForgotPassword = {
      email: "",
    };

    const response = await forgotPassword(forgotPasswordData);
    if (response.error) {
      enqueueSnackbar(`Error: Send instructions.`, {
        variant: "error",
      });
      setLoading(false);
      handleClose();
      return;
    }
    enqueueSnackbar(
      `Forgot password instructions have been successfully sent to your email.`,
      {
        variant: "success",
      }
    );
    setLoading(false);
    handleClose();
    Router.reload();
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton size="small" onClick={handleClickOpen}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <Button onClick={handleClose} autoFocus disabled={loading}>
            Cancel
          </Button>
          <LoadingButton onClick={handleDelete} color="error" loading={loading}>
            Send Me Instructions
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
