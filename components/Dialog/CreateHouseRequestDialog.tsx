import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Router from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";

import { HouseProps, UserType } from "const";
import { createHouseRequest } from "lib/http";

export default function AlertDialog(props: { bookId: string }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(0);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    setLoading(true);
    const user: UserType = {
      id: "",
      name: "",
      email: "",
      phone: "",
    };
    const house: HouseProps = undefined;
    const response = await createHouseRequest(house, user);
    if (response.error) {
      enqueueSnackbar(`Error: Add house request.`, {
        variant: "error",
      });
      setLoading(false);
      handleClose();
      return;
    }
    enqueueSnackbar(`Your request for a house was successfully added.`, {
      variant: "success",
    });
    setLoading(false);
    handleClose();
    Router.reload();
  };

  return (
    <>
      <Tooltip title="Add">
        <IconButton size="small" onClick={handleClickOpen}>
          <PersonAddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Rating"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Rating
              name="simple-controlled"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Typography>{value}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus disabled={loading}>
            Cancel
          </Button>
          <LoadingButton
            onClick={handleAdd}
            color="success"
            loading={loading}
            disabled={!value}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
