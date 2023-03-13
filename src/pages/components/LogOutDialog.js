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
} from "@mui/material";

import { ReactComponent as ArrowLeftIcon } from "../../assets/svg/arrow_left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/svg/arrow_right.svg";
import { ReactComponent as SettingIcon } from "../../assets/svg/setting.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg";

import "../../utils/firebase";
import { getAuth, signOut } from "firebase/auth";

export default function LogOutDialog({ Open, onClose }) {
  const auth = getAuth();

  const [payload, SetPayload] = useState({
    username: "",
    email: "",
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
        window.location.reload();
        localStorage.clear();
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
      sx={{ top: "60px" }}
    >
      <Box
        sx={{
          padding: "5px",
        }}
      >
        <MenuList>
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
