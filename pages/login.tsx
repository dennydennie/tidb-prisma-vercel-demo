import LoginForm from "components/Forms/LoginDialog";
import CommonLayout from "components/Layout";

import Head from "next/head";
import styles from "../styles/HomePage.module.css";

function login() {
  return (
    <>
      <Head>
        <title>Nyumba Yanga : Login</title>
        <meta name="description" content="Nyumba Yanga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}>
            <LoginForm />
          </main>
        </div>
      </CommonLayout>
    </>
  );
}

export default login;
