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
  const [payload, SetPayload] = useState({
    Fname: "",
    Lname: "",
    Age: "",
    username: "",
    Phonenum: "",
    schooltype: "",
    schoollevel: "",
    day: "",
    month: "",
    year: "",
    avatar: "",
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
          SetPayload({ ...payload, username: user.displayName });
        }
      });
    };
    SetData();
  }, []);
  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: (theme) => theme.palette.secondary.bg9,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "normal",
            color: (theme) => theme.palette.textColor.col1,
            mb: "20px",
          }}
        >
          Settings
        </Typography>
        <Paper
          sx={{
            padding: "10px",
            borderRadius: "10px",
            width: {
              lg: "500px",
              md: "400px",
              sm: "400px",
              xs: "90%",
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
                {payload.username}
              </Typography>
            </Box>
          </Button>
          {payload.Fname === "" ||
          payload.Lname === "" ||
          payload.Age === "" ||
          payload.Phonenum === "" ||
          payload.day === "" ||
          payload.month === "" ||
          payload.year === "" ? (
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
                  textTransform: "capitalize",
                  mb: "20px",
                }}
              >
                Complete your information
              </Typography>
              <Link
                component={NLink}
                to="/userrole_ver"
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
              md: "400px",
              sm: "400px",
              xs: "90%",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            width: "400px",
          }}
        >
          <Link component={NLink} sx={{ textDecoration: "none" }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                color: (theme) => theme.palette.textColor.col7,
                mr: "5px"
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
              mr: "5px"
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
      <ProfilePicDialog
        Open={dialog.isOpen}
        onClose={handleChangeDialogPicClose}
      />
    </Box>
  );
}
