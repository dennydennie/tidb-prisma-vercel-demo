import { Box } from "@mui/material";
import CreateHouseAddressForm from "components/Forms/CreateHouseAddress";
import CommonLayout from "components/Layout";
import { getCookie } from "cookies-next";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/HomePage.module.css";

const Home: NextPage = (props: any) => {
  const session = getCookie("session");

  console.log(session);

  const router = useRouter();

  if (!session) {
    router.push("/login");
  }

  if (session) {
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
                <CreateHouseAddressForm session={session} />
              </Box>
            </main>
          </div>
        </CommonLayout>
      </>
    );
  }

  return <></>;
};

export default Home;
