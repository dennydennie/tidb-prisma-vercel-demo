import { Box } from "@mui/material";
import ForgotPasswordDialog from "components/Forms/ForgotPassword";
import CommonLayout from "components/Layout";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/HomePage.module.css";

const ForgotPassword: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nyumba Yanga: Forgot Password</title>
        <meta name="description" content="Nyumba Yanga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}>
            <Box>
              <ForgotPasswordDialog />
            </Box>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default ForgotPassword;
