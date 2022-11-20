import { Box } from "@mui/material";
import CreateHouseAddressDialog from "components/Dialog/CreateHouseAddressDialog";
import CommonLayout from "components/Layout";
import { getCookie } from "cookies-next";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/HomePage.module.css";

const Home: NextPage = () => {
  const session = getCookie("session");
  const router = useRouter();

  if (!session) {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>Nyumba Yanga</title>
        <meta name="description" content="Nyumba Yanga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}>
            <Box>
              <CreateHouseAddressDialog session={session} />
            </Box>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
