import React, { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Link,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from "@mui/material";

import { Link as NLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ReactComponent as MenuIcon } from "../../assets/svg/menu.svg";
import { ReactComponent as ExitIcon } from "../../assets/svg/exit.svg";
import { ReactComponent as DegreeIcon } from "../../assets/svg/more-user.svg";
import { ReactComponent as ActivityIcon } from "../../assets/svg/recent.svg";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";

import RightDrawer from "./RightDrawer";

import "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";

export default function NavBar() {
  const auth = getAuth();
  const db = getFirestore();
  const location = useLocation();
  const themes = useTheme();
  const [drawer, SetDrawer] = useState({
    isOpen: false,
    exit: true,
  });

  const [payload, SetPayload] = useState({
    userrole: "",
  });

  const handleOpenDrawer = () => {
    SetDrawer({ ...drawer, isOpen: true });
  };

  const handleCloseDrawer = () => {
    SetDrawer({ ...drawer, isOpen: false });
  };

  useEffect(() => {
    const SetData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = collection(db, "Users");
          const q = query(userRef, where("userUid", "==", user.uid));
          onSnapshot(q, (querySnapShot) => {
            querySnapShot.forEach((docs) => {
              SetPayload({ ...payload, userrole: docs.data().userRole });
            });
          });
        }
      });
    };
    SetData();
  }, []);
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
        <Box component="span" sx={{ flexGrow: ".75" }} />
        {payload.userrole === "" ? (
          ""
        ) : payload.userrole === "Student" ? (
          <Box
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "block",
                xs: "none",
              },
            }}
          >
            <Link
              component={NLink}
              sx={{ textDecoration: "none" }}
              to="/dashboard"
            >
              <Button
                sx={{
                  height: "65px",
                  width: {
                    lg: "100px",
                    md: "100px",
                    sm: "inherit",
                    xs: "100px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <HomeIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      color: location.pathname.includes("/dashboard")
                        ? "#26399C"
                        : "#8A92A6",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "bold",
                      fontSize: "14px",
                      display: {
                        lg: "block",
                        md: "block",
                        sm: "none",
                        xs: "none",
                      },
                      textTransform: "capitalize",
                      color: location.pathname.includes("/dashboard")
                        ? (theme) => theme.palette.secondary.bg1
                        : (theme) => theme.palette.secondary.bg5,
                    }}
                  >
                    Home
                  </Typography>
                </Box>
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: "0px",
                    height: "4px",
                    width: "100%",
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
                sx={{
                  backgroundColor: "",
                  height: "65px",
                  width: {
                    lg: "100px",
                    md: "100px",
                    sm: "inherit",
                    xs: "100px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <ActivityIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      color: location.pathname.includes("/activity")
                        ? "#26399C"
                        : "#8A92A6",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "bold",
                      fontSize: "14px",
                      display: {
                        lg: "block",
                        md: "block",
                        sm: "none",
                        xs: "none",
                      },
                      marginLeft: "5px",
                      textTransform: "capitalize",
                      color: location.pathname.includes("/activity")
                        ? (theme) => theme.palette.secondary.bg1
                        : (theme) => theme.palette.secondary.bg5,
                    }}
                  >
                    Activity
                  </Typography>
                </Box>
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: "0px",
                    height: "4px",
                    width: "100%",
                    backgroundColor: location.pathname.includes("/activity")
                      ? (theme) => theme.palette.secondary.bg1
                      : "",
                  }}
                />
              </Button>
            </Link>
            <Link
              component={NLink}
              sx={{ textDecoration: "none" }}
              to="/classes"
            >
              <Button
                sx={{
                  backgroundColor: "",
                  height: "65px",
                  width: {
                    lg: "100px",
                    md: "100px",
                    sm: "inherit",
                    xs: "100px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <DegreeIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      color: location.pathname.includes("/classes")
                        ? "#26399C"
                        : "#8A92A6",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "bold",
                      fontSize: "14px",
                      display: {
                        lg: "block",
                        md: "block",
                        sm: "none",
                        xs: "none",
                      },
                      textTransform: "capitalize",
                      color: location.pathname.includes("/classes")
                        ? (theme) => theme.palette.secondary.bg1
                        : (theme) => theme.palette.secondary.bg5,
                    }}
                  >
                    Classes
                  </Typography>
                </Box>
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: "0px",
                    height: "4px",
                    width: "100%",
                    backgroundColor: location.pathname.includes("/classes")
                      ? (theme) => theme.palette.secondary.bg1
                      : "",
                  }}
                />
              </Button>
            </Link>
          </Box>
        ) : (
          ""
        )}
        <Box component="span" sx={{ flexGrow: "1" }} />
        {payload.userrole === "" ? (
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
        ) : payload.userrole === "Student" ? (
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
        ) : (
          ""
        )}
      </Toolbar>
      <RightDrawer Open={drawer.isOpen} onClose={handleCloseDrawer} />
    </AppBar>
  );
}
