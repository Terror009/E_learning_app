import React, { useState } from "react";

import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";

/* import { ReactComponent as ArrowRightIcon } from "../assets/svg/arrow_right.svg";
import "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth"; */

import { Link as NLink, useLocation } from "react-router-dom";

import UserRoleNavBar from "./components/userrole_ver/UserRoleNavBar";

import "../utils/firebase";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  query,
} from "firebase/firestore";

export default function UserRoleVer() {

  return (
    <Box>
      <UserRoleNavBar />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          backgroundColor: (theme) => theme.palette.secondary.bg9,
          padding: "20px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "350px",
            width: "60%",
          }}
        >
          <Link
            component={NLink}
            to="/userrole_ver/student"
          >
            <Button
              sx={{
                height: "200px",
                width: "250px",
                borderRadius: "10px",
                backgroundColor: (theme) => theme.palette.secondary.bg4,
                boxShadow: "0px 8px 0px #72bcd4",
                transition: "0.4s ease",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.bg10,
                  boxShadow: "none",
                  transform: "translateY(5%)",
                },
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col4,
                  }}
                >
                  Student
                </Typography>
              </Box>
            </Button>
          </Link>
          <Link component={NLink} to="/userrole_ver/teacher">
            <Button
              sx={{
                height: "200px",
                width: "250px",
                borderRadius: "10px",
                backgroundColor: (theme) => theme.palette.secondary.bg4,
                boxShadow: "0px 8px 0px #72bcd4",
                transition: "0.4s ease",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.bg10,
                  boxShadow: "none",
                  transform: "translateY(5%)",
                },
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col4,
                  }}
                >
                  Teacher
                </Typography>
              </Box>
            </Button>
          </Link>
        </Paper>
      </Box>
    </Box>
  );
}
