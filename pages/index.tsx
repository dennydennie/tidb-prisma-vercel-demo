import type { NextPage } from "next";
import Head from "next/head";
import {
  TableBody,
  Button,
  Card,
  Grid,
  TableCell,
  TableRow,
} from "@mui/material";
import CommonLayout from "components/Layout";
import { token } from "const";
import { Backend } from "lib/backend";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { blueGrey } from "@mui/material/colors";
import { getCookie } from "cookies-next";

const Home: NextPage = () => {
  const router = useRouter();
  const [houses, setHouses] = useState<any>([]);
  const session = getCookie("session");

  if (!session) {
    router.push("/login");
    return <></>;
  }

  useEffect(() => {
    const getHouses = async () => {
      const response = await Backend({
        endPoint: "/houses",
        action: "get",
        headers: {
          Authorization: session,
        },
      });
      setHouses(response?.data);
    };
    getHouses();
  }, []);

  const handleViewHouse = (id: string) => {
    router.push(`/houses/${id}`);
  };

  if (!session) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Nyumba Yanga : Home</title>
        <meta name="description" content="Nyumba Yanga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 1, sm: 8, md: 8, lg: 12 }}
            >
              {houses?.map((house: any) => (
                <Grid item xs={2} sm={4} md={4} lg={3} key={house.id}>
                  <Card
                    sx={{
                      background: blueGrey[300],
                      p: "30px",
                      borderRadius: "10px",
                      border: 2,
                      borderColor: "blue",
                    }}
                  >
                    <TableBody sx={{ marginY: "5px" }}>
                      <TableRow>
                        <TableCell sx={{ width: "90%", borderColor: "blue" }}>
                          Rooms:{" "}
                        </TableCell>
                        <TableCell sx={{ borderColor: "blue" }}>
                          {house.rooms}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody sx={{ marginY: "5px" }}>
                      <TableRow>
                        <TableCell sx={{ borderColor: "blue" }}>
                          Bathrooms:
                        </TableCell>
                        <TableCell sx={{ borderColor: "blue" }}>
                          {house.bathrooms}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody sx={{ marginY: "5px" }}>
                      <TableRow>
                        <TableCell sx={{ borderColor: "blue" }}>
                          Rental Fee:
                        </TableCell>
                        <TableCell sx={{ borderColor: "blue" }}>
                          {house.rentalFee}
                        </TableCell>
                      </TableRow>
                    </TableBody>

                    <TableBody sx={{ marginY: "5px" }}>
                      <TableRow>
                        <TableCell sx={{ borderColor: "blue" }}>
                          Water:{" "}
                        </TableCell>
                        <TableCell sx={{ borderColor: "blue" }}>
                          {" "}
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
                      </TableRow>
                    </TableBody>
                    <TableBody sx={{ marginY: "5px" }}>
                      <TableRow>
                        <TableCell sx={{ borderColor: "blue" }}>
                          {" "}
                          Electricity:{" "}
                        </TableCell>
                        <TableCell sx={{ borderColor: "blue" }}>
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
                      </TableRow>
                    </TableBody>

                    <TableBody sx={{ marginY: "5px" }}>
                      <TableRow>
                        <TableCell sx={{ borderColor: "blue" }}>
                          Own Entrance:
                        </TableCell>
                        <TableCell sx={{ borderColor: "blue" }}>
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
                      </TableRow>
                    </TableBody>

                    <Button
                      sx={{ width: "100%", mt: "1.5rem" }}
                      color="primary"
                      variant="contained"
                      onClick={() => handleViewHouse(house.id)}
                    >
                      Read More
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
