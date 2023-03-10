import React from "react";

import { Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import { Link as NLink } from "react-router-dom";
import { ReactComponent as FbIcon } from "../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../assets/svg/google.svg";
import { ReactComponent as EmailIcon } from "../assets/svg/email.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/arrow_right.svg";

import "../utils/firebase";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export default function UserRegister() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const signInGoogle = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column ",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: (theme) => theme.palette.primary.bg2,
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
      <Paper sx={{ padding: "24px", width: "350px" }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Register in to Quiz Bee
        </Typography>
        <Button
          fullWidth
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: (theme) => theme.palette.secondary.bg2,
            transition: "0.2s ease",
            padding: "10px 15px",

            "&:hover": {
              boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
            },
            marginBottom: "20px",
          }}
          onClick={signInGoogle}
        >
          <GoogleIcon
            style={{ height: "30px", width: "30px", marginRight: "15px" }}
          />
          <Typography
            variant="body1"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "bold",
              color: (theme) => theme.palette.textColor.col5,
              textTransform: "capitalize",
            }}
          >
            Continue with Google
          </Typography>
          <Box component="span" sx={{ flexGrow: "1" }} />
          <ArrowRightIcon style={{ color: "#2499E3" }} />
        </Button>
        <Link component={NLink} to="/" sx={{ textDecoration: "none" }}>
          <Button
            fullWidth
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: (theme) => theme.palette.secondary.bg2,
              padding: "10px 15px",
              transition: "0.2s ease",

              "&:hover": {
                boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
              },
              marginBottom: "20px",
            }}
          >
            <FbIcon
              style={{ height: "25px", width: "25px", marginRight: "20px" }}
            />
            <Typography
              variant="body1"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col5,
                textTransform: "capitalize",
              }}
            >
              Continue with Facebook
            </Typography>
            <Box component="span" sx={{ flexGrow: "1" }} />
            <ArrowRightIcon style={{ color: "#2499E3" }} />
          </Button>
        </Link>
        <Link component={NLink} to="/register/register_use_email" sx={{ textDecoration: "none" }}>
          <Button
            fullWidth
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: (theme) => theme.palette.secondary.bg2,
              padding: "10px 15px",
              transition: "0.2s ease",

              "&:hover": {
                boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
              },
            }}
          >
            <EmailIcon
              style={{
                height: "20px",
                width: "20px",
                marginRight: "25px",
                color: "#000000",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col5,
                textTransform: "capitalize",
              }}
            >
              Continue with Email
            </Typography>
            <Box component="span" sx={{ flexGrow: "1" }} />
            <ArrowRightIcon style={{ color: "#2499E3" }} />
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}
