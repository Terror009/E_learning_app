import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link as NLink } from "react-router-dom";
import { motion } from "framer-motion";

import MessageDialog from "./components/MessageDialog";

import { ReactComponent as ShowIcon } from "../assets/svg/show.svg";
import { ReactComponent as HideIcon } from "../assets/svg/hide.svg";
import { ReactComponent as EmailIcon } from "../assets/svg/email-solid.svg";

import "../utils/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
export default function UserLogin() {
  const auth = getAuth();

  const [dialog, SetDialog] = useState({
    message: "",
    isOpen: false,
    icon: false,
  });

  const [payload, SetPayload] = useState({
    email: "",
    password: "",
    showpassword: false,
  });
  const handleChangeDialogClose = () => {
    SetDialog({ ...dialog, isOpen: false });
  };
  const handleChangePasswordShow = () => {
    SetPayload({ ...payload, showpassword: true });
  };
  const handleChangePasswordHide = () => {
    SetPayload({ ...payload, showpassword: false });
  };

  const handleChange = (prop) => (e) => {
    SetPayload({ ...payload, [prop]: e.target.value });
  };
  const LoginAccount = async () => {
    if (payload.email === "" || payload.password === "") {
      SetDialog({
        ...dialog,
        message: "Please enter value in fields",
        isOpen: true,
        icon: false,
      });
    } else if (payload.password.length < 8 || payload.password.length > 12) {
      SetDialog({
        ...dialog,
        message: "Please enter 8 - 12 character password",
        isOpen: true,
        icon: false,
      });
    } else {
      await signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((user) => {})
        .catch((err) => {
          console.log(err);
          const message = err.message;

          if (message.includes("auth/invalid-email")) {
            SetDialog({
              ...dialog,
              message: "Invalid email!",
              isOpen: true,
              icon: false,
            });
          } else if (message.includes("auth/wrong-password")) {
            SetDialog({
              ...dialog,
              message: "Wrong username/password!",
              isOpen: true,
              icon: false,
            });
          } else if (message.includes("auth/user-not-found")) {
            SetDialog({
              ...dialog,
              message: "Wrong username/password!",
              isOpen: true,
              icon: false,
            });
          }
        });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.bg4,
      }}
    >
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          display: "flex",
          flexDirection: "column ",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            marginBottom: "40px",
            color: (theme) => theme.palette.textColor.col2,
          }}
        >
          Quiz Bee
        </Typography>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 20px",
            width: {
              lg: "500px",
              md: "400px",
              sm: "80%",
              xs: "80%",
            },
            animation: "swing ease-out 5s forward",
          }}
        >
          <Box component="label" htmlFor="email" placeholder="Email Address" />
          <TextField
            fullWidth
            id="email"
            placeholder="Email Address"
            sx={{
              backgroundColor: (theme) => theme.palette.common.white,
              borderRadius: "10px",
              mb: "20px",
              mt: "20px",
              "& label.Mui-focused": {
                borderColor: (theme) => theme.palette.secondary.main,
                borderRadius: "10px",
              },
              "& .MuiInput-underline:after": {
                borderColor: (theme) => theme.palette.secondary.main,
                borderRadius: "10px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "10px",
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "10px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "10px",
                },
              },
              input: {
                color: (theme) => theme.palette.textColor.col7,
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon
                    style={{
                      height: "25px",
                      width: "25px",
                      color: "#26399C",
                      margin: "0px 15px 0px 5px",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            type="email"
            onChange={handleChange("email")}
            value={payload.email}
          />
          <TextField
            fullWidth
            id="password"
            placeholder="Password"
            autoComplete="off"
            sx={{
              backgroundColor: (theme) => theme.palette.common.white,
              borderRadius: "10px",
              mb: "20px",
              "& label.Mui-focused": {
                borderColor: (theme) => theme.palette.secondary.main,
                borderRadius: "10px",
              },
              "& .MuiInput-underline:after": {
                borderColor: (theme) => theme.palette.secondary.main,
                borderRadius: "10px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "10px",
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "10px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "10px",
                },
              },
              input: {
                color: (theme) => theme.palette.textColor.col7,
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
              },
            }}
            type={payload.showpassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {payload.showpassword ? (
                    <IconButton
                      sx={{ padding: "4px", mr: "10px" }}
                      onClick={handleChangePasswordHide}
                    >
                      <HideIcon
                        style={{
                          height: "25px",
                          width: "25px",
                          color: "#26399C",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{ padding: "4px", mr: "10px" }}
                      onClick={handleChangePasswordShow}
                    >
                      <ShowIcon
                        style={{
                          height: "25px",
                          width: "25px",
                          color: "#26399C",
                        }}
                      />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            onChange={handleChange("password")}
            value={payload.password}
          />
          <Button
            fullWidth
            sx={{
              height: "50px",
              backgroundColor: (theme) => theme.palette.secondary.main,
              boxShadow: "0px 6px 0px #26399C",
              borderRadius: "10px",
              transition: "0.3s ease",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: (theme) => theme.palette.secondary.bg7,
                transform: "translateY(10%)",
              },
              mb: "20px",
            }}
            onClick={LoginAccount}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                color: (theme) => theme.palette.textColor.col2,
                textTransform: "capitalize",
              }}
            >
              Login
            </Typography>
          </Button>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col1,
                mr: "10px",
              }}
            >
              Don't have an account?
            </Typography>
            <Button sx={{ backgroundColor: "rgba(0,0,0,0.2)" }} size="small">
              <Link
                component={NLink}
                to="/register"
                sx={{ textDecoration: "none" }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  Register
                </Typography>
              </Link>
            </Button>
          </Box>
        </Paper>
      </motion.div>
      <MessageDialog
        Open={dialog.isOpen}
        onClose={handleChangeDialogClose}
        message={dialog.message}
        icon={dialog.icon}
      />
    </Box>
  );
}
