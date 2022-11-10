import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { NextPage } from "next";
import Head from "next/head";

import { SetterOrUpdater, useRecoilState } from "recoil";

import CommonLayout from "components/Layout";
import LeftNav from "components/Navigation/HomeLeftNav";
import styles from "../styles/HomePage.module.css";

const PAGE_SIZE = 8;

const BookList = (props: { page: number }) => {
  const { page } = props;

  const FilterChips = (props: {
    data: { page: number; type: string; sort: string; size: number };
    onChange: SetterOrUpdater<{
      page: number;
      type: string;
      sort: string;
      size: number;
    }>;
  }) => {
    const { data, onChange } = props;
    const handleDelete = (key: "type" | "sort") => {
      onChange((originData) => ({ ...originData, [key]: "" }));
    };
    return (
      <Stack direction="row" spacing={1}>
        {data.type && (
          <Chip
            label={`Type: ${data.type
              .replaceAll(`_nbsp_`, ` `)
              .replaceAll(`_amp_`, `&`)}`}
            size="small"
            onDelete={() => {
              handleDelete("type");
            }}
          />
        )}
        {data.sort && (
          <Chip
            label={`Sort: ${data.sort}`}
            size="small"
            onDelete={() => {
              handleDelete("sort");
            }}
          />
        )}
      </Stack>
    );
  };
};
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bookstore Home</title>
        <meta name="description" content="Nyumba Yanga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <LeftNav className={styles.nav} />
          <main className={styles.main}></main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
