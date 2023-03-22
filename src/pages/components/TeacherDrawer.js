import React, { useState, useEffect } from "react";

import { Drawer, Box, Typography, Button, Link, Divider } from "@mui/material";
import { Link as NLink, useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { ReactComponent as ClassIcon } from "../../assets/svg/students.svg";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { ReactComponent as ReportIcon } from "../../assets/svg/report.svg";
import { ReactComponent as SettingIcon } from "../../assets/svg/setting.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg";

import "../../utils/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
export default function TeacherDrawer({ open, onClose }) {
  const auth = getAuth();
  const db = getFirestore();
  const location = useLocation();
  const navigate = useNavigate();

  const [payload, SetPayload] = useState({
    proper_call: "",
    lname: "",
  });

  useEffect(() => {
    const SetData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = collection(db, "Users");
          const q = query(userRef, where("userUid", "==", user.uid));
          onSnapshot(q, (querySnapShot) => {
            querySnapShot.forEach((docs) => {
              SetPayload({
                ...payload,
                proper_call: docs.data().proper_call,
                lname: docs.data().Lastname,
              });
            });
          });
        }
      });
    };
    SetData();
  }, []);

  const isClose = () => {
    onClose();
  };
  const LogOut = () => {
    signOut(auth)
      .then(() => {
        window.localStorage.clear();
        window.location.reload();
        window.location.replace("/login");
        console.log("were");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Drawer open={open} onClose={isClose} anchor={"left"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "200px",
          backgroundColor: (theme) => theme.palette.common.white,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            color: (theme) => theme.palette.textColor.col1,
            margin: "10px 0px 20px 10px",
          }}
        >
          Quiz Bee
        </Typography>
        <Typography
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            color: (theme) => theme.palette.textColor.col1,
            textTransform: "capitalize",
            margin: "0px 0px 20px 10px",
          }}
        >
          {payload.proper_call + " " + payload.lname}
        </Typography>
        <Divider orientation="horizontal" sx={{ mb: "20px" }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Link
            component={NLink}
            to="/dashboard"
            sx={{ textDecoration: "none" }}
          >
            <Button
              fullWidth
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
              startIcon={
                <HomeIcon
                  style={{
                    height: "20px",
                    width: "20px",
                    color: location.pathname.includes("/dashboard")
                      ? "#2499E3"
                      : "#8A92A6",
                    marginLeft: "10px",
                  }}
                />
              }
            >
              <Typography
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: location.pathname.includes("/dashboard")
                    ? (theme) => theme.palette.textColor.col1
                    : (theme) => theme.palette.textColor.col4,
                  textTransform: "capitalize",
                }}
              >
                Home
              </Typography>
            </Button>
          </Link>
          <Link
            component={NLink}
            to="/teacherclasses"
            sx={{ textDecoration: "none" }}
          >
            <Button
              fullWidth
              sx={{ display: "flex", justifyContent: "flex-start" }}
              startIcon={
                <ClassIcon
                  style={{
                    height: "20px",
                    width: "20px",
                    color: location.pathname.includes("/teacherclasses")
                      ? "#2499E3"
                      : "#8A92A6",
                    marginLeft: "10px",
                  }}
                />
              }
            >
              <Typography
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: location.pathname.includes("/teacherclasses")
                    ? (theme) => theme.palette.textColor.col1
                    : (theme) => theme.palette.textColor.col4,
                  textTransform: "capitalize",
                }}
              >
                Classes
              </Typography>
            </Button>
          </Link>
          <Link
            component={NLink}
            to="/teacherreport"
            sx={{ textDecoration: "none" }}
          >
            <Button
              fullWidth
              sx={{ display: "flex", justifyContent: "flex-start" }}
              startIcon={
                <ReportIcon
                  style={{
                    height: "20px",
                    width: "20px",
                    color: location.pathname.includes("/teacherreport")
                      ? "#2499E3"
                      : "#8A92A6",
                    marginLeft: "10px",
                  }}
                />
              }
            >
              <Typography
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: location.pathname.includes("/teacherreport")
                    ? (theme) => theme.palette.textColor.col1
                    : (theme) => theme.palette.textColor.col4,
                  textTransform: "capitalize",
                }}
              >
                Report
              </Typography>
            </Button>
          </Link>
        </Box>
        <Box component="span" sx={{ flexGrow: ".5" }} />
        <Divider orientation="horizontal" />
        <Link component={NLink} to="/teachersettings" sx={{ textDecoration: "none" }}>
          <Button
            fullWidth
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              "&:hover": {
                icon: { color: "#2499E3" },
              },
            }}
            startIcon={
              <SettingIcon
                style={{
                  height: "20px",
                  width: "20px",
                  color: "#8A92A6",
                  marginLeft: "10px",
                }}
              />
            }
          >
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col4,
                textTransform: "capitalize",
              }}
            >
              Settings
            </Typography>
          </Button>
        </Link>
        <Button
          onClick={LogOut}
          fullWidth
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            "&:hover": {
              icon: { color: "#2499E3" },
            },
          }}
          startIcon={
            <LogoutIcon
              style={{
                height: "20px",
                width: "20px",
                color: "#8A92A6",
                marginLeft: "10px",
              }}
            />
          }
        >
          <Typography
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "bold",
              color: (theme) => theme.palette.textColor.col4,
              textTransform: "capitalize",
            }}
          >
            Log out
          </Typography>
        </Button>
      </Box>
    </Drawer>
  );
}
