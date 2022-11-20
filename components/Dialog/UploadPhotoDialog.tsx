import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Backend } from "lib/backend";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

export default function UploadPhotoDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    query: { houseId },
  } = router;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    router.push("/");
  };

  async function handleSubmit(event: any) {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ODU4MjhhNC0wZDM4LTRmODktYTg3Ni1jMjAzODVmYjI4OTciLCJpYXQiOjE2Njg0NTA4MTQsImV4cCI6MTY2ODQ2MDQxNH0.eNGwL1hEl8Sag_T_5qUBDK0SgfRIW7eEW78s7Ub0kvE";
    //const token = session.user.accessToken;
    event.preventDefault();
    const file = event?.target.files[0];

    const payload = new FormData();
    payload.append("file", file);
    payload.append("name", file.name);

    try {
      const res = await Backend({
        endPoint: `/houses/photo/${houseId}`,
        payload,
        action: "post",
        headers: {
          Authorization: token,
        },
      });
      if (res?.data) {
        enqueueSnackbar(`Success.`, {
          variant: "success",
        });
        router.push("/");
        setIsUpdating(false);
      }
    } catch (error) {
      enqueueSnackbar(`Please try again.`, {
        variant: "error",
      });
    }
  }

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
      </IconButton>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Photo</DialogTitle>
          <form encType="multipart/form-data">
            <DialogContent>
              <input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                onChange={(e) => handleSubmit(e)}
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
                Finish
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}
