import React, { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Link,
} from "@mui/material";

import { Link as NLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ReactComponent as MenuIcon } from "../../assets/svg/menu.svg";
import { ReactComponent as ExitIcon } from "../../assets/svg/exit.svg";

import RightDrawer from "./RightDrawer";
export default function NavBar() {
  const location = useLocation();
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
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
          }}
          variant="h6"
        >
          Quiz Bee
        </Typography>
        <Box component="span" sx={{ flexGrow: "1" }} />
        <Box>
          <Link
            component={NLink}
            sx={{ textDecoration: "none" }}
            to="/dashboard"
          >
            <Button
              sx={{ backgroundColor: "", height: "65px", width: "100px" }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  color: (theme) => theme.palette.secondary.bg1,
                }}
              >
                Home
              </Typography>
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  bottom: "0px",
                  height: "4px",
                  width: "100px",
                  backgroundColor: location.pathname.includes("/dashboard")
                    ? (theme) => theme.palette.secondary.bg1
                    : "",
                }}
              />
            </Button>
          </Link>
          <Link
            component={NLink}
            sx={{ textDecoration: "none" }}
            to="/activity"
          >
            <Button
              sx={{ backgroundColor: "", height: "65px", width: "100px" }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  color: (theme) => theme.palette.secondary.bg1,
                }}
              >
                Activity
              </Typography>
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  bottom: "0px",
                  height: "4px",
                  width: "100px",
                  backgroundColor: location.pathname.includes("/activity")
                    ? (theme) => theme.palette.secondary.bg1
                    : "",
                }}
              />
            </Button>
          </Link>
          <Link component={NLink} sx={{ textDecoration: "none" }} to="/classes">
            <Button
              sx={{ backgroundColor: "", height: "65px", width: "100px" }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  color: (theme) => theme.palette.secondary.bg1,
                }}
              >
                Classes
              </Typography>
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  bottom: "0px",
                  height: "4px",
                  width: "100px",
                  backgroundColor: location.pathname.includes("/classes")
                    ? (theme) => theme.palette.secondary.bg1
                    : "",
                }}
              />
            </Button>
          </Link>
        </Box>
        <Box component="span" sx={{ flexGrow: "1" }} />
        <Box>
          <IconButton
            onClick={handleOpenDrawer}
            sx={{ backgroundColor: (theme) => theme.palette.secondary.bg9 }}
          >
            {!drawer.isOpen ? (
              <MenuIcon
                style={{ height: "25px", width: "25px", color: "#26399C" }}
              />
            ) : (
              <ExitIcon
                style={{ height: "25px", width: "25px", color: "#26399C" }}
              />
            )}
          </IconButton>
        </Box>
      </Toolbar>
      <RightDrawer Open={drawer.isOpen} onClose={handleCloseDrawer} />
    </AppBar>
  );
}
