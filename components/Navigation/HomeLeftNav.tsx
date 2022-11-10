import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListSubheader from "@mui/material/ListSubheader";
import Checkbox from "@mui/material/Checkbox";
import { VariantType, useSnackbar } from "notistack";
import Skeleton from "@mui/material/Skeleton";

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilValueLoadable,
} from "recoil";

const BookTypeComponent = (props: { loading: boolean; data: string[] }) => {
  return (
    <>
      <List>
        <ListSubheader>{`Book Types`}</ListSubheader>
        {props.loading && (
          <>
            <ListItem disablePadding>
              <Skeleton
                sx={{ margin: "0 1rem", width: "100%", height: "3rem" }}
              />
            </ListItem>
          </>
        )}
        {props.data.map((bookType) => (
          <ListItem key={bookType} disablePadding></ListItem>
        ))}
      </List>
    </>
  );
};

const SortComponent = () => {
  return (
    <>
      <List>
        <ListSubheader>{`Sort By`}</ListSubheader>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default function BasicList(props: { className?: string }) {
  const [checked, setChecked] = React.useState([0]);

  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      className={props.className}
    >
      <nav aria-label="main mailbox folders">
        <SortComponent />

        {/* <List>
          <ListSubheader>{`Popular in Books`}</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Best books of the month" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="New releases" />
            </ListItemButton>
          </ListItem>
        </List> */}

        {/* <List>
          <ListSubheader>{`Authors`}</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(0)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(0) !== -1}
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText primary={`Author 1`} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(0)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(0) !== -1}
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText primary={`Author 2`} />
            </ListItemButton>
          </ListItem>
        </List> */}

        {/* <List>
          <ListSubheader>{`Price`}</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="0 - 10" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="11 - 20" />
            </ListItemButton>
          </ListItem>
        </List> */}
      </nav>
    </Box>
  );
}
