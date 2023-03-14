import React, { useEffect, useState } from "react";

import {
  Box,
  AppBar,
  Toolbar,
  Paper,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  Link,
  Skeleton,
} from "@mui/material";

import { Link as NLink } from "react-router-dom";

import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import StudentDashboard from "./DashboardRole/StudentDashboard";
import TeacherDashboard from "./DashboardRole/TeacherDashboard";

import "../utils/firebase";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  onSnapshot,
  where,
  query,
  collection,
} from "firebase/firestore";

export default function Dashboard() {
  const auth = getAuth();
  const db = getFirestore();
  const [payload, SetPayload] = useState({
    email: "",
    username: "",
    nousername: "",
    role: "",
    status: false,
  });
  const [activity, SetActivity] = useState(0);

  useEffect(() => {
    const SetData = () => {
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
                  role: docs.data().userRole,
                  status: docs.data().Status,
                  username: user.displayName,
                });
              });
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          SetPayload({
            ...payload,
            nousername: "create account",
          });
        }
      });
    };
    SetData();
  }, []);
  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar />
      {payload.status && payload.role === "Student" ? (
        <StudentDashboard />
      ) : payload.status && payload.role === "Teacher" ? (
        <TeacherDashboard />
      ) : (
        <Box
          sx={{
            backgroundColor: "linen",
            position: "relative",
            padding: {
              lg: "20px 20px",
              md: "20px 20px",
              sm: "20px 20px",
              xs: "20px 10px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column",
              },
              justifyContent: "space-around",
              mb: "20px",
            }}
          >
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                width: {
                  lg: "60%",
                  md: "60%",
                  sm: "60%",
                  xs: "100%",
                },
                mb: {
                  lg: "0px",
                  md: "0px",
                  sm: "0px",
                  xs: "20px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "5px",
                  width: {
                    lg: "400px",
                    md: "400px",
                    ms: "90%",
                    xs: "90%",
                  },
                  backgroundColor: (theme) => theme.palette.secondary.bg3,
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: (theme) => theme.palette.secondary.bg8,
                  borderRadius: "15px",
                }}
              >
                <TextField
                  placeholder="Enter a join code"
                  fullWidth
                  sx={{
                    backgroundColor: (theme) => theme.palette.common.white,
                    borderRadius: "10px",
                    outline: "none",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.2) inset",
                    "& label.Mui-focused": {
                      borderColor: "transparent",
                      borderRadius: "10px",
                    },
                    "& .MuiInput-underline:after": {
                      borderColor: "transparent",
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "transparent",
                        borderRadius: "10px",
                      },
                      "&:hover fieldset": {
                        borderColor: "transparent",
                        borderRadius: "10px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "transparent",
                        borderRadius: "10px",
                      },
                    },
                    input: {
                      color: (theme) => theme.palette.textColor.col7,
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "bold",
                    },
                  }}
                />
                <Button
                  sx={{
                    height: "52px",
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    marginLeft: "5px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 0px #26399C",
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.secondary.bg8,
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "normal",
                    }}
                  >
                    Join
                  </Typography>
                </Button>
              </Box>
            </Paper>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                width: {
                  lg: "35%",
                  md: "35%",
                  sm: "35%",
                  xs: "100%",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  height: "20px",
                  width: "200px",
                  backgroundColor: "yellow",
                  padding: "15px 5px",
                  borderRadius: "30px",
                }}
              >
                <Avatar
                  sx={{
                    height: "35px",
                    width: "35px",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: (theme) => theme.palette.secondary.bg7,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                  }}
                >
                  {auth.currentUser ? payload.username : payload.nousername}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Link
                  component={NLink}
                  to="/setting"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "bold",
                      color: (theme) => theme.palette.textColor.col7,
                    }}
                  >
                    Edit Profile
                  </Typography>
                </Link>
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              backgroundColor: "",
              padding: {
                lg: "10px",
                md: "10px",
                sm: "10px",
                xs: "0px",
              },
            }}
          >
            <Paper
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "200px",
                      width: "250px",
                      mb: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "20px",
                      width: "250px",
                      mb: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "20px",
                      width: "150px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: {
                      lg: "flex",
                      md: "flex",
                      sm: "flex",
                      xs: "none",
                    },
                    flexDirection: "column",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "200px",
                      width: "250px",
                      mb: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "20px",
                      width: "250px",
                      mb: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "20px",
                      width: "150px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: {
                      lg: "flex",
                      md: "flex",
                      sm: "none",
                      xs: "none",
                    },
                    flexDirection: "column",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "200px",
                      width: "250px",
                      mb: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "20px",
                      width: "250px",
                      mb: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "20px",
                      width: "150px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  backgroundColor: (theme) => theme.palette.primary.bg5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: (theme) => theme.palette.textColor.col7,
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "normal",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  It looks like you don't role yet!!
                </Typography>
                <Link
                  component={NLink}
                  to="/setting"
                  sx={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      height: "45px",
                      width: "fit-content",
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      borderRadius: "30px",
                      boxShadow: "0px 4px 0px #26399C",
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.secondary.bg8,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "normal",
                      }}
                    >
                      Complete your Information
                    </Typography>
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
      <BottomNav />
      <Box sx={{ padding: "20px", height: "20px" }}>
        <Typography
          variant="caption"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "600",
            color: (theme) => theme.palette.textColor.col4,
          }}
        >
          Copyright © 2023 All Right Reserved
        </Typography>
      </Box>
    </Box>
  );
}
