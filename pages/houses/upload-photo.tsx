import { Box } from "@mui/material";
import UploadPhotoDialog from "components/Forms/UploadPhotoDialog";
import CommonLayout from "components/Layout";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/HomePage.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nyumba Yanga: Upload Photo</title>
        <meta name="description" content="Nyumba Yanga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}>
            <Box>
              <UploadPhotoDialog />
            </Box>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
