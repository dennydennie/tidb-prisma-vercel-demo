import CommonLayout from "components/Layout";
import { Backend } from "lib/backend";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { blueGrey } from "@mui/material/colors";
import styles from "../../styles/HomePage.module.css";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Base64 } from "js-base64";

const House: NextPage = (props: any) => {
  const router = useRouter();
  const [photo, setPhoto] = useState("");
  const { id } = router.query;
  const { house } = props;

  useEffect(() => {
    const getPhoto = async () => {
      const token = getCookie("session");

      const res = await Backend({
        endPoint: `/houses/photo/${house?.photo}`,
        action: "get",
        headers: {
          Authorization: token,
        },
      });

      if (res?.data !== undefined) {
        const photo = `data:image/jpg;base64, ${Base64.toBase64(res?.data)}`;
        setPhoto(photo);
      }
    };
    getPhoto();
  });

  return (
    <>
      <Head>
        <title>House Details</title>
        <meta name="description" content="House Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}>
            <Grid item xs={2} sm={4} md={4} key={house.id}>
              <Card
                sx={{
                  p: "30px",
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ marginX: "20rem" }}>
                  {photo && <img src={photo} height={400} width={600} />}
                </Box>
                <Table>
                  <TableBody>
                    {" "}
                    <TableCell sx={{ marginY: "5px" }}>
                      Status: {house.status}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Rooms: {house.rooms}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Bathrooms: {house.bathrooms}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Rental Fee: {house.rentalFee}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Rental Period: {house.rentalPeriod}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Deposit: {house.securityDeposit}
                    </TableCell>
                  </TableBody>

                  <TableBody>
                    <TableCell sx={{ marginY: "5px" }}>
                      Water:{" "}
                      {house.hasWater ? (
                        <CheckCircleOutlineIcon
                          sx={{ marginY: "-0.25rem" }}
                          color="success"
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon
                          sx={{ marginY: "-0.25rem" }}
                          fontSize="small"
                          color="error"
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Electricity:{" "}
                      {house.hasElectricity ? (
                        <CheckCircleOutlineIcon
                          sx={{ marginY: "-0.25rem" }}
                          color="success"
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon
                          sx={{ marginY: "-0.25rem" }}
                          fontSize="small"
                          color="error"
                        />
                      )}
                    </TableCell>

                    <TableCell sx={{ marginY: "5px" }}>
                      Celling:{" "}
                      {house.hasCelling ? (
                        <CheckCircleOutlineIcon
                          sx={{ marginY: "-0.25rem" }}
                          color="success"
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon
                          sx={{ marginY: "-0.25rem" }}
                          fontSize="small"
                          color="error"
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Borehole:{" "}
                      {house.hasBorehole ? (
                        <CheckCircleOutlineIcon
                          sx={{ marginY: "-0.25rem" }}
                          color="success"
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon
                          sx={{ marginY: "-0.25rem" }}
                          fontSize="small"
                          color="error"
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Bills Included:{" "}
                      {house.billsIncluded ? (
                        <CheckCircleOutlineIcon
                          sx={{ marginY: "-0.25rem" }}
                          color="success"
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon
                          sx={{ marginY: "-0.25rem" }}
                          fontSize="small"
                          color="error"
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ marginY: "5px" }}>
                      Has Backup Power:{" "}
                      {house.hasBackupElectricity ? (
                        <CheckCircleOutlineIcon
                          sx={{ marginY: "-0.25rem" }}
                          color="success"
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon
                          sx={{ marginY: "-0.25rem" }}
                          fontSize="small"
                          color="error"
                        />
                      )}
                    </TableCell>
                  </TableBody>
                  <TableCell sx={{ marginY: "5px" }}>
                    Cupboards:{" "}
                    {house.hasBuiltInCupboards ? (
                      <CheckCircleOutlineIcon
                        sx={{ marginY: "-0.25rem" }}
                        color="success"
                        fontSize="small"
                      />
                    ) : (
                      <CancelIcon
                        sx={{ marginY: "-0.25rem" }}
                        fontSize="small"
                        color="error"
                      />
                    )}
                  </TableCell>

                  <TableCell sx={{ marginY: "5px" }}>
                    Tiles:{" "}
                    {house.isTilled ? (
                      <CheckCircleOutlineIcon
                        sx={{ marginY: "-0.25rem" }}
                        color="success"
                        fontSize="small"
                      />
                    ) : (
                      <CancelIcon
                        sx={{ marginY: "-0.25rem" }}
                        fontSize="small"
                        color="error"
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ marginY: "5px" }}>
                    Own Entrance:{" "}
                    {house.hasOwnEntrance ? (
                      <CheckCircleOutlineIcon
                        sx={{ marginY: "-0.25rem" }}
                        color="success"
                        fontSize="small"
                      />
                    ) : (
                      <CancelIcon
                        sx={{ marginY: "-0.25rem" }}
                        fontSize="small"
                        color="error"
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ marginY: "5px" }}>
                    Has Parking:{" "}
                    {house.hasParking ? (
                      <CheckCircleOutlineIcon
                        sx={{ marginY: "-0.25rem" }}
                        color="success"
                        fontSize="small"
                      />
                    ) : (
                      <CancelIcon
                        sx={{ marginY: "-0.25rem" }}
                        fontSize="small"
                        color="error"
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ marginY: "5px" }}>
                    Sharing:{" "}
                    {house.sharing ? (
                      <CheckCircleOutlineIcon
                        sx={{ marginY: "-0.25rem" }}
                        color="success"
                        fontSize="small"
                      />
                    ) : (
                      <CancelIcon
                        sx={{ marginY: "-0.25rem" }}
                        fontSize="small"
                        color="error"
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ marginY: "5px" }}>
                    Has Durawall:{" "}
                    {house.isWalled ? (
                      <CheckCircleOutlineIcon
                        sx={{ marginY: "-0.25rem" }}
                        color="success"
                        fontSize="small"
                      />
                    ) : (
                      <CancelIcon
                        sx={{ marginY: "-0.25rem" }}
                        fontSize="small"
                        color="error"
                      />
                    )}
                  </TableCell>
                </Table>
                <Button
                  sx={{ width: "100%", mt: "1.5rem" }}
                  color="primary"
                  variant="contained"
                >
                  View Contact Details
                </Button>
              </Card>
            </Grid>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default House;

export async function getServerSideProps({
  query,
  res,
  req,
}: {
  query: any;
  req: any;
  res: any;
}) {
  const token = getCookie("session", { res, req });

  try {
    const housesResponse = await Backend({
      endPoint: `/houses/${query.houseId}`,
      action: "get",
      headers: {
        Authorization: token,
      },
    });

    return {
      props: {
        ...query,
        house: housesResponse?.data,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
}

function hexToBase64(str: any) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  );
}
