import React, { useEffect, useState } from "react";

import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

import { ReactComponent as ArrowRightIcon } from "../../../assets/svg/arrow_right.svg";
import "../../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import LogOutDialog from "../LogOutDialog";


export default function UserRoleNavBar() {
  const auth = getAuth();
  const [payload, SetPayload] = useState({
    email: "",
    username: "",
  });

  const [drawer, SetDrawer] = useState({
    isOpen: false,
    exit: true,
  });

  const handleOpenDrawer = () => {
    SetDrawer({ ...drawer, isOpen: true });
  };

  const handleCloseDrawer = () => {
    SetDrawer({ ...drawer, isOpen: false });
  };

  useEffect(() => {
    const GetData = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          SetPayload({
            ...payload,
            email: user.email,
            username: user.displayName,
          });
        } else {
          SetPayload({ ...payload, email: "", username: "" });
        }
      });
    };
    GetData();
  }, []);
  return (
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: theme => theme.palette.primary.bg4}}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "bold",
              color: (theme) => theme.palette.textColor.col7,
            }}
          >
            Quiz Bee
          </Typography>
          <Box component="span" sx={{ flexGrow: "1" }} />
          <Button
            sx={{
              height: "40px",
              width: "170px",
              backgroundColor: (theme) => theme.palette.secondary.main,
              borderRadius: "10px",
              boxShadow: "0px 5px 0px #26399C",
              transition: "0.5s ease",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.secondary.bg8,
                boxShadow: "0px 0px 0px #72bcd4",
                transform: "translatey(10%)",
              },
            }}
            onClick={handleOpenDrawer}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col5,
                  marginLeft: "50px",
                }}
              >
                Signed as
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.common.white,
                  textTransform: "capitalize",
                }}
              >
                {payload.username}
              </Typography>
            </Box>
            <ArrowRightIcon
              style={{ height: "25px", width: "25px", marginLeft: "10px" }}
            />
          </Button>
        </Toolbar>
        <LogOutDialog Open={drawer.isOpen} onClose={handleCloseDrawer} />
      </AppBar>
    </Box>
  );
}
