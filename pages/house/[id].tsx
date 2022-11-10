import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CommonLayout from "components/Layout";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const HouseInfoSection = () => {
  const handleUpdate = () => {};
};

const ReviewItem = (props: {
  user: {
    nickname:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
  };
  score:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | null
    | undefined;
  ratedAt: string | number | Date;
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1rem 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Avatar sx={{ width: 24, height: 24 }}></Avatar>
          <Typography color="text.secondary">{props.user.nickname}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Typography color="text.secondary" variant="body2">
            {props.score}
          </Typography>
        </Box>
        <Typography color="text.secondary" variant="body2">
          {`Reviewed on ${new Date(props.ratedAt).toLocaleDateString()}`}
        </Typography>
      </Box>
    </>
  );
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const StarPercentageBar = (props: { leftText?: string; value: number }) => {
  const { leftText, value } = props;
  const valueRound = Math.round(value);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
      }}
    >
      {leftText && (
        <Typography color="text.secondary" variant="body2" component="span">
          {leftText}
        </Typography>
      )}
      <BorderLinearProgress
        variant="determinate"
        value={valueRound}
        sx={{ flexGrow: 1 }}
      />
      {
        <Typography
          color="text.secondary"
          variant="body2"
          component="span"
          sx={{ width: "2rem" }}
        >{`${valueRound}%`}</Typography>
      }
    </Box>
  );
};

const ReviewOverview = (props: { content: any[] }) => {
  const num = props.content.length;
  const sum = props.content.reduce((prev, item) => {
    return prev + item.score;
  }, 0);
  const avg = sum / num;
  return (
    <Box
      sx={{
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          value={avg}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>{}</Box>
      </Box>
      <Typography
        color="text.secondary"
        variant="body2"
      >{`${num} global ratings`}</Typography>
      <StarPercentageBar
        leftText="5 Star"
        value={(props.content.filter((i) => i.score === 5).length / num) * 100}
      />
      <StarPercentageBar
        leftText="4 Star"
        value={(props.content.filter((i) => i.score === 4).length / num) * 100}
      />
      <StarPercentageBar
        leftText="3 Star"
        value={(props.content.filter((i) => i.score === 3).length / num) * 100}
      />
      <StarPercentageBar
        leftText="2 Star"
        value={(props.content.filter((i) => i.score === 2).length / num) * 100}
      />
      <StarPercentageBar
        leftText="1 Star"
        value={(props.content.filter((i) => i.score === 1).length / num) * 100}
      />
      <StarPercentageBar
        leftText="0 Star"
        value={(props.content.filter((i) => i.score === 0).length / num) * 100}
      />
    </Box>
  );
};

const houseDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // const houseDetailsLodable = useRecoilValueLoadable(houseDetailsQuery);

  return (
    <>
      <Head>
        <title>house Details</title>
        <meta name="description" content="house Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout></CommonLayout>
    </>
  );
};

export default houseDetails;
