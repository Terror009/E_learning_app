import React, { useState } from "react";

import { Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import { Link as NLink } from "react-router-dom";

import "../../utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  getRedirectResult,
} from "firebase/auth";
export default function RegisterUseEmail() {
  const auth = getAuth();

  const [payload, SetPayload] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (e) => {
    SetPayload({ ...payload, [prop]: e.target.value });
  };

  const RegisterAccount = async () => {
    await createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      sx={{
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
          padding: "0px 20px",
          width: {
            lg: "340px",
            md: "70%",
            sm: "70%",
            xs: "70%",
          },
        }}
      >
        <Box component="label" htmlFor="email" placeholder="Email Address" />
        <TextField
          size="small"
          fullWidth
          id="email"
          sx={{ marginBottom: "20px" }}
          onChange={handleChange("email")}
          value={payload.email}
        />
        <TextField
          size="small"
          fullWidth
          id="password"
          sx={{ marginBottom: "20px" }}
          onChange={handleChange("password")}
          value={payload.password}
        />
        <Button
          fullWidth
          sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}
          onClick={RegisterAccount}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "bold",
              color: (theme) => theme.palette.textColor.col4,
            }}
          >
            Register
          </Typography>
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "400",
            }}
          >
            Already have an account?
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
                }}
              >
                Login
              </Typography>
            </Link>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
