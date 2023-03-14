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

import NavBar from "./components/NavBar";

import { ReactComponent as UserEditIcon } from "../assets/svg/user-edit.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/arrow_right.svg";
import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow_left.svg";
import { ReactComponent as UserCircleIcon } from "../assets/svg/user-circle.svg";

import ProfilePicDialog from "../pages/components/ProfilePicDialog";

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
export default function Setting() {
  const auth = getAuth();
  const db = getFirestore();
  const [payload, SetPayload] = useState({
    Fname: "",
    Lname: "",
    Age: "",
    nickname: "",
    Phonenum: "",
    schooltype: "",
    schoollevel: "",
    day: "",
    month: "",
    year: "",
    avatar: "",
    role: "",
    Steps: "",
    Status: "",
  });
  const [dialog, SetDialog] = useState({
    isOpen: false,
  });
  const handleChangeDialogPicOpen = () => {
    SetDialog({ ...dialog, isOpen: true });
  };
  const handleChangeDialogPicClose = () => {
    SetDialog({ ...dialog, isOpen: false });
  };

  useEffect(() => {
    const SetData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          SetPayload({ ...payload, nickname: user.displayName });
          try {
            const userRef = collection(db, "Users");
            const q = query(userRef, where("userUid", "==", user.uid));
            onSnapshot(q, (querySnapShot) => {
              querySnapShot.forEach((docs) => {
                SetPayload({
                  ...payload,
                  Fname: docs.data().Firstname,
                  Lname: docs.data().Lastname,
                  Phonenum: docs.data().Phonenumber,
                  Age: docs.data().Age,
                  day: docs.data().Birthday.Day,
                  month: docs.data().Birthday.Month,
                  year: docs.data().Birthday.Year,
                  nickname: docs.data().nickname,
                  schooltype: docs.data().SchoolType,
                  schoollevel: docs.data().SchoolLevel,
                  role: docs.data().userRole,
                  Steps: docs.data().Steps,
                  Status: docs.data().Status,
                });
              });
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    };
    SetData();
  }, []);
  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.bg9,
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
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { lg: "500px", md: "500px", sm: "500px", xs: "100%" },
              mb: "20px",
            }}
          >
            <Link
              component={NLink}
              to="/dashboard"
              sx={{ textDecoration: "none" }}
            >
              <IconButton
                sx={{
                  display: { lg: "none", md: "none", sm: "none", xs: "flex" },
                }}
              >
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
              onClick={handleChangeDialogPicOpen}
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
            {payload.Fname === "" ||
            payload === "" ||
            payload.Phonenum === "" ||
            payload.Age === "" ||
            payload.day === "" ||
            payload.month === "" ||
            payload.year === "" ? (
              ""
            ) : (
              <Box>
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
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
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
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "normal",
                        color: (theme) => theme.palette.textColor.col1,
                        textTransform: "capitalize",
                      }}
                    >
                      {payload.Fname + " " + payload.Lname}
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
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "bold",
                        color: (theme) => theme.palette.textColor.col1,
                        textTransform: "capitalize",
                      }}
                    >
                      Birthday
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
                      {payload.month + "/" + payload.day + "/" + payload.year}
                    </Typography>
                  </Box>
                </Button>
              </Box>
            )}
            {payload.schoollevel === "" || payload.schooltype === "" ? (
              ""
            ) : (
              <Box>
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
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
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
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "normal",
                        color: (theme) => theme.palette.textColor.col1,
                        textTransform: "capitalize",
                      }}
                    >
                      {payload.schooltype}
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
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "bold",
                        color: (theme) => theme.palette.textColor.col1,
                        textTransform: "capitalize",
                      }}
                    >
                      Grade/Year
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
                      {payload.schoollevel}
                    </Typography>
                  </Box>
                </Button>
              </Box>
            )}
            {payload.Steps !== 3 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textAlign: "center",
                    mb: "20px",
                  }}
                >
                  {payload.Steps === "1"
                    ? "You need to finish the steps"
                    : payload.Steps === "2"
                    ? "You almost done please proceed to the next step"
                    : "Complete your information"}
                </Typography>
                <Link
                  component={NLink}
                  to={
                    payload.role === "Student"
                      ? "/userrole_ver/student"
                      : payload.role === "Teacher"
                      ? "/userrole_ver/teacher"
                      : "/userrole_ver"
                  }
                  sx={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      height: "40px",
                      width: "100px",
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      boxShadow: "0px 6px 0px #26399C",
                      borderRadius: "10px",
                      transition: "0.3s ease",
                      "&:hover": {
                        boxShadow: "none",
                        backgroundColor: (theme) => theme.palette.secondary.bg7,
                        transform: "translateY(10%)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "normal",
                        color: (theme) => theme.palette.textColor.col2,
                        textTransform: "capitalize",
                      }}
                    >
                      Click here
                    </Typography>
                  </Button>
                </Link>
              </Box>
            ) : (
              ""
            )}
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
          <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
            <Link>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                  color: (theme) => theme.palette.textColor.col7,
                  mr: "5px",
                }}
              >
                Terms of Service
              </Typography>
            </Link>
            <Divider
              orientation="vertical"
              sx={{
                height: "10px",
                backgroundColor: (theme) => theme.palette.secondary.main,
                mr: "5px",
              }}
            />
            <Link component={NLink} sx={{ textDecoration: "none" }}>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                  color: (theme) => theme.palette.textColor.col7,
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "20px", height: "10px" }}>
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
      <ProfilePicDialog
        Open={dialog.isOpen}
        onClose={handleChangeDialogPicClose}
      />
    </Box>
  );
}
