import React from "react";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  Link,
} from "@mui/material";

import { Link as NLink } from "react-router-dom";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/arrow_right.svg";

export default function Main() {
  return (
    <Box>
      <AppBar sx={{ height: "61px", boxShadow: "none" }} position="relative">
        <Toolbar sx={{ display: "flex", padding: "0px 20px" }}>
          <Typography
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "bolder",
            }}
            variant="h5"
          >
            E Learner
          </Typography>
          <Box component="span" sx={{ flexGrow: "1" }} />
          <Button
            sx={{
              height: "40px",
              width: "120px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "darkblue",
              borderRadius: "10px",
              boxShadow: "0px 5px 0px #26399C",
              transition: "0.4s ease",
              "&:hover": {
                boxShadow: "0px 0px 0px #26399C",
                transform: "translatey(10%)",
              },
            }}
            endIcon={
              <ArrowRightIcon style={{ height: "15px", width: "15px", color: "#26399C"}} />
            }
          >
            <Typography
              sx={{
                color: "#fff",
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontSize: "15px",
                fontWeight: "bold",
                textTransform: "capitalize",
                color: "darkblue",
              }}
              variant="body1"
            >
              Enter Code
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          backgroundColor: "",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "600",
          }}
        >
          It Matters how you ask
        </Typography>
        <Typography
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            marginBottom: "20px",
          }}
          variant="h6"
        >
          Assesment, instruction, and pratice that motivate every student to
          mastery
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "",
            width: "250px",
          }}
        >
          <Link component={NLink} sx={{ textDecoration: "none" }} to="/login">
            <Button
              sx={{
                height: "60px",
                width: "150px",
                borderRadius: "10px",
                boxShadow: "0px 5px 0px #26399C",
                transition: "0.4s ease",
                backgroundColor: (theme) => theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.bg8,
                  boxShadow: "0px 0px 0px #26399C",
                  transform: "translatey(10%)",
                },
                mr: "30px",
              }}
              endIcon={
                <ArrowRightIcon style={{ height: "20px", width: "20px" }} />
              }
            >
              <Typography
                sx={{
                  color: "darkblue",
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                  fontSize: "20px",
                  textTransform: "capitalize",
                  color: (theme) => theme.palette.textColor.col2,
                }}
              >
                Login
              </Typography>
            </Button>
          </Link>
          <Link
            component={NLink}
            sx={{ textDecoration: "none" }}
            to="/register"
          >
            <Button
              sx={{
                height: "60px",
                width: "150px",
                backgroundColor: (theme) => theme.palette.secondary.bg4,
                boxShadow: "0px 5px 0px #72bcd4",
                borderRadius: "10px",
                transition: "0.4s ease",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.bg10,
                  boxShadow: "0px 0px 0px #72bcd4",
                  transform: "translatey(10%)",
                },
              }}
              endIcon={
                <ArrowRightIcon
                  style={{ height: "20px", width: "20px", color: "#717171" }}
                />
              }
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.textColor.col3,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontSize: "20px",
                  textTransform: "capitalize",
                }}
              >
                Register
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
