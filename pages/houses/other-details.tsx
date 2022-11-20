import { Box } from "@mui/material";
import CreateHouseAddressDialog from "components/Dialog/CreateHouseAddressDialog";
import CreateHouseOtherDetailsDialog from "components/Dialog/CreateHouseOtherDetailsDialog";
import CreateHouseRoomsDialog from "components/Dialog/CreateHouseRoomsDialog";
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
              <CreateHouseOtherDetailsDialog session={undefined} />
            </Box>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
