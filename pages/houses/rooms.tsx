import { Box } from "@mui/material";
import CreateHouseAddressForm from "components/Forms/CreateHouseAddress";
import CreateHouseOtherDetailsDialog from "components/Forms/CreateHouseOtherDetails";
import CreateHouseRoomsForm from "components/Forms/CreateHouseRooms";
import CommonLayout from "components/Layout";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../../styles/HomePage.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nyumba Yanga</title>
        <meta name="description" content="Nyumba Yanga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          {/* <LeftNav className={styles.nav} /> */}
          <main className={styles.main}>
            <Box>
              <CreateHouseRoomsForm session={undefined} />
            </Box>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
