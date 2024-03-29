import React, { useState, useEffect } from "react";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  MenuList,
  MenuItem,
  Menu,
  Button,
  Link,
} from "@mui/material";

import { Link as NLink } from "react-router-dom";
import { ReactComponent as ArrowLeftIcon } from "../../assets/svg/arrow_left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/svg/arrow_right.svg";
import { ReactComponent as SettingIcon } from "../../assets/svg/setting.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg";

import "../../utils/firebase";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
export default function RightDrawer({ Open, onClose }) {
  const auth = getAuth();
  const db = getFirestore();
  const [payload, SetPayload] = useState({
    username: "",
    email: "",
    nickname: "",
  });
  useEffect(() => {
    const ReadData = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          SetPayload({
            ...payload,
            username: user.displayName,
            email: user.email,
          });
          try {
            const userRef = collection(db, "Users");
            const q = query(userRef, where("userUid", "==", user.uid));
            onSnapshot(q, (querySnapShot) => {
              querySnapShot.forEach((docs) => {
                SetPayload({
                  ...payload,
                  nickname: docs.data().nickname,
                  username: user.displayName,
                  email: user.email,
                });
              });
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          SetPayload({ ...payload, username: "", email: "" });
        }
      });
    };
    ReadData();
  }, []);
  const isClose = () => {
    onClose();
  };

  const SignOut = () => {
    signOut(auth)
      .then((user) => {
        isClose();
        window.localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Menu
      open={Open}
      onClose={isClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      anchorEl={Boolean(Open)}
      sx={{ top: "60px" }}
    >
      <Box
        sx={{
          width: "220px",
          padding: "20px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            color: (theme) => theme.palette.textColor.col4,
          }}
        >
          {auth.currentUser && !payload.nickname
            ? payload.username
            : payload.nickname}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "normal",
            color: (theme) => theme.palette.textColor.col4,
            marginBottom: "20px",
          }}
        >
          {payload.email}
        </Typography>
        <MenuList>
          <Link component={NLink} to="/setting" sx={{ textDecoration: "none" }}>
            <MenuItem>
              <SettingIcon
                style={{
                  height: "20px",
                  width: "20px",
                  color: "#8A92A6",
                  marginRight: "10px",
                  padding: "10px 0px",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col4,
                }}
              >
                Settings
              </Typography>
            </MenuItem>
          </Link>
          <MenuItem>
            <Button onClick={SignOut}>
              <LogoutIcon
                style={{
                  height: "20px",
                  width: "20px",
                  color: "#8A92A6",
                  marginRight: "10px",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col4,
                }}
              >
                Log out
              </Typography>
            </Button>
          </MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
}
