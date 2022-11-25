import SignupFormDialog from "components/Forms/SignupDialog";
import CommonLayout from "components/Layout";
import Head from "next/head";
import styles from "../styles/HomePage.module.css";

function signup() {
  return (
    <>
      <Head>
        <title>Nyumba Yanga : Signup</title>
        <meta name="description" content="Nyumba Yanga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}></main>
        </div>
      </CommonLayout>
      <SignupFormDialog />
    </>
  );
}

export default signup;
