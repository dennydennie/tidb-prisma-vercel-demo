import CommonLayout from "components/Layout";
import { Backend } from "lib/backend";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { blueGrey } from "@mui/material/colors";
import styles from "../../styles/HomePage.module.css";
import { getCookie } from "cookies-next";

const House: NextPage = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  const { house } = props;

  return (
    <>
      <Head>
        <title>house Details</title>
        <meta name="description" content="house Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}>
            <Grid item xs={2} sm={4} md={4} key={house.id}>
              <Card
                sx={{
                  background: blueGrey[200],
                  p: "30px",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ marginY: "5px" }}>
                  Status: {house.status}
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
                  Rooms: {house.rooms}
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
                  Bathrooms: {house.bathrooms}
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
                  Rental Fee: {house.rentalFee}
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
                  Rental Period: {house.rentalPeriod}
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
                  Deposit: {house.securityDeposit}
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>

                <Typography sx={{ marginY: "5px" }}>
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
                </Typography>
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

    return { props: { ...query, house: housesResponse?.data } };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
}
