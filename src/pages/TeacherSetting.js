import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import { Link as NLink } from "react-router-dom";

import { ReactComponent as UserEditIcon } from "../assets/svg/user-edit.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/arrow_right.svg";
import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow_left.svg";
import { ReactComponent as UserCircleIcon } from "../assets/svg/user-circle.svg";

import ProfilePicDialog from "../pages/components/ProfilePicDialog";
import TeacherNavBar from "./components/TeacherNavBar";
import TeacherDrawer from "./components/TeacherDrawer";
import TeacherDashboardDrawer from "./components/TeacherDashboardDrawer";
import TeacherUpdateSettingModal from "./components/TeacherUpdateSettingModal";

import "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
export default function TeacherSetting() {
  const auth = getAuth();
  const db = getFirestore();
  const [payload, SetPayload] = useState({
    Fname: "",
    Lname: "",
    Age: "",
    nickname: "",
    Phonenum: "",
    schooltype: "",
    avatar: "",
    role: "",
    Status: "",
    proper_call: "",
    email: "",
  });
  const [dialog, SetDialog] = useState({
    isOpen: false,
  });

  const [modal, SetModal] = useState({
    isOpen: false,
    target: "",
  });
  const handleChangeDialogPicOpen = () => {
    SetDialog({ ...dialog, isOpen: true });
  };
  const handleChangeDialogPicClose = () => {
    SetDialog({ ...dialog, isOpen: false });
  };

  const handleChangeModalOpen = (e) => {
    SetModal({ ...modal, isOpen: true });
  };
  console.log(modal.target);
  const handleChangeModalClose = () => {
    SetModal({ ...modal, isOpen: false });
  };

  useEffect(() => {
    const getUserData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = collection(db, "Users");
          const q = query(userRef, where("userUid", "==", user.uid));
          onSnapshot(q, (snapshot) => {
            snapshot.forEach((docs) => {
              if (docs.exists) {
                SetPayload({
                  ...payload,
                  Fname: docs.data().Firstname,
                  Lname: docs.data().Lastname,
                  proper_call: docs.data().proper_call,
                  Age: docs.data().Age,
                  Phonenum: docs.data().Phonenumber,
                  schooltype: docs.data().SchoolType,
                  email: docs.data().email,
                  Status: docs.data().Status,
                  role: docs.data().userRole,
                  nickname: docs.data().nickname,
                });
              }
            });
          });
        }
      });
    };
    getUserData();
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.secondary.bg9,
        display: "flex",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: {
            lg: "block",
            md: "none",
            sm: "none",
            xs: "none",
          },
          height: "100vh",
          width: "200px",

          backgroundColor: "red",
          zIndex: 10000,
        }}
      >
        <TeacherDashboardDrawer />
      </Box>
      <Box
        sx={{
          postion: "relative",
          display: "flex",
          flexDirection: "column",
          width: {
            lg: "90%",
            md: "100%",
            sm: "100%",
            xs: "100%",
          },
        }}
      >
        <TeacherNavBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            padding: {
              lg: "20px 40px",
              md: "20px 40px",
              sm: "20px 40px",
              xs: "20px 20px",
            },
            backgroundColor: (theme) => theme.palette.secondary.bg9,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              mb: "20px",
            }}
          >
            <Link
              component={NLink}
              to="/dashboard"
              sx={{ textDecoration: "none" }}
            >
              <IconButton>
                <ArrowLeftIcon style={{ height: "30px", width: "30px" }} />
              </IconButton>
            </Link>
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                fontSize: "20px",
                color: (theme) => theme.palette.textColor.col1,
              }}
            >
              Settings
            </Typography>
          </Box>
          <Paper
            sx={{
              padding: "20px 10px",
              borderRadius: "10px",
              width: {
                lg: "500px",
                md: "500px",
                sm: "500px",
                xs: "95%",
              },
              mb: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
              <UserEditIcon
                style={{
                  height: "25px",
                  width: "25px",
                  color: "#26399C",
                  marginRight: "10px",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                  color: (theme) => theme.palette.textColor.col1,
                }}
              >
                Profile
              </Typography>
            </Box>
            <Button
              fullWidth
              sx={{
                display: "flex",
                padding: "10px",
              }}
              endIcon={
                <ArrowRightIcon
                  id="icon"
                  style={{ height: "15px", width: "15px", color: "#26399C" }}
                />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  Avatar
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "normal",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  Avatar_1
                </Typography>
              </Box>
            </Button>
            <Button
              fullWidth
              sx={{
                display: "flex",
                padding: "10px",
              }}
              endIcon={
                <ArrowRightIcon
                  id="icon"
                  style={{ height: "15px", width: "15px", color: "#26399C" }}
                />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  Name
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "normal",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  {payload.proper_call +
                    " " +
                    payload.Fname +
                    " " +
                    payload.Lname}
                </Typography>
              </Box>
            </Button>
            <Button
              onClick={(e) => handleChangeModalOpen(e)}
              id="username"
              fullWidth
              sx={{
                display: "flex",
                padding: "10px",
              }}
              endIcon={
                <ArrowRightIcon
                  id="icon"
                  style={{ height: "15px", width: "15px", color: "#26399C" }}
                />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  Username
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "normal",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  {payload.nickname}
                </Typography>
              </Box>
            </Button>
            <Box sx={{ display: "flex" }}>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  padding: "10px",
                }}
                endIcon={
                  <ArrowRightIcon
                    id="icon"
                    style={{ height: "15px", width: "15px", color: "#26399C" }}
                  />
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "bold",
                      color: (theme) => theme.palette.textColor.col1,
                      textTransform: "capitalize",
                    }}
                  >
                    Mobile Number
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "normal",
                      color: (theme) => theme.palette.textColor.col1,
                      textTransform: "capitalize",
                    }}
                  >
                    {payload.Phonenum}
                  </Typography>
                </Box>
              </Button>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  padding: "10px",
                }}
                endIcon={
                  <ArrowRightIcon
                    id="icon"
                    style={{ height: "15px", width: "15px", color: "#26399C" }}
                  />
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "bold",
                      color: (theme) => theme.palette.textColor.col1,
                      textTransform: "capitalize",
                    }}
                  >
                    Age
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "normal",
                      color: (theme) => theme.palette.textColor.col1,
                      textTransform: "capitalize",
                    }}
                  >
                    {payload.Age}
                  </Typography>
                </Box>
              </Button>
            </Box>
            <Button
              fullWidth
              sx={{
                display: "flex",
                padding: "10px",
              }}
              endIcon={
                <ArrowRightIcon
                  id="icon"
                  style={{
                    height: "15px",
                    width: "15px",
                    color: "#26399C",
                  }}
                />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  School
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "normal",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  {payload.schooltype}
                </Typography>
              </Box>
            </Button>
          </Paper>
          <Paper
            sx={{
              padding: "10px",
              borderRadius: "10px",
              width: {
                lg: "500px",
                md: "500px",
                sm: "500px",
                xs: "95%",
              },
              mb: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
              <UserCircleIcon
                style={{
                  height: "30px",
                  width: "30px",
                  color: "#26399C",
                  marginRight: "10px",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                  color: (theme) => theme.palette.textColor.col1,
                }}
              >
                Account Settings
              </Typography>
            </Box>
            <Button
              fullWidth
              sx={{
                display: "flex",
                padding: "10px",
              }}
              endIcon={
                <ArrowRightIcon
                  id="icon"
                  style={{ height: "15px", width: "15px", color: "#26399C" }}
                />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col7,
                    textTransform: "capitalize",
                  }}
                >
                  Update Password
                </Typography>
              </Box>
            </Button>
            <Button
              fullWidth
              sx={{
                display: "flex",
                padding: "10px",
              }}
              endIcon={
                <ArrowRightIcon
                  id="icon"
                  style={{ height: "15px", width: "15px", color: "#26399C" }}
                />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col7,
                    textTransform: "capitalize",
                  }}
                >
                  Log out
                </Typography>
              </Box>
            </Button>
          </Paper>
        </Box>
        <Box
          sx={{
            padding: "20px",
            height: "20px",
            backgroundColor: (theme) => theme.palette.common.white,
          }}
        >
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
      <TeacherUpdateSettingModal
        open={modal.isOpen}
        onClose={handleChangeModalClose}
        data={payload}
        target={modal.target}
      />
    </Box>
  );
}
