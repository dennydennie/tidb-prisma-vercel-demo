import DialogTitle from "@mui/material/DialogTitle";
import { Backend } from "lib/backend";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { getCookie } from "cookies-next";

export default function UploadPhotoDialog() {
  const session = getCookie("session");
  const router = useRouter();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    query: { houseId },
  } = router;

  async function handleSubmit(event: any) {
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
          Authorization: session,
        },
      });

      if (res?.status === 201) {
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
      <DialogTitle>Add Photo</DialogTitle>
      <form encType="multipart/form-data">
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          onChange={(e) => handleSubmit(e)}
        />
      </form>
    </>
  );
}
