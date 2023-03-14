import React, { useEffect, useState } from "react";

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

import { Link as NLink, useLocation } from "react-router-dom";

import { ReactComponent as StudentIcon } from "../assets/svg/student.svg";
import { ReactComponent as TeacherIcon } from "../assets/svg/teacher.svg";

import UserRoleNavBar from "./components/userrole_ver/UserRoleNavBar";

import "../utils/firebase";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function UserRoleVer() {
  const auth = getAuth();
  const db = getFirestore();

  const handleChange = (e) => {
    window.localStorage.setItem("role", e.target.id);
  };

  const CreateRole = () => {
    if (window.localStorage.getItem("role") === "Student") {
      const userDoc = doc(db, "Users", auth.currentUser.uid);
      setDoc(
        userDoc,
        {
          userRole: "Student",
        },
        { merge: true }
      );
    } else if (window.localStorage.getItem("role") === "Teacher") {
      const userDoc = doc(db, "Users", auth.currentUser.uid);
      setDoc(
        userDoc,
        {
          userRole: "Teacher",
        },
        { merge: true }
      );
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.primary.bg4,
      }}
    >
      <UserRoleNavBar />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          transition: "0.5s ease",
          marginTop: {
            lg: "60px",
            md: "60px",
            sm: "60px",
            xs: "100px",
          },
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: {
              lg: "300px",
              md: "300px",
              sm: "300px",
              xs: "200px",
            },
            width: {
              lg: "40%",
              md: "50%",
              sm: "60%",
              xs: "100%",
            },
            backgroundColor: (theme) => theme.palette.secondary.bg9,
          }}
        >
          <Link
            component={NLink}
            sx={{ textDecoration: "none" }}
            to="/userrole_ver/student"
          >
            <Button
              id="Student"
              onClick={(e) => {handleChange(e); CreateRole()}}
              sx={{
                height: {
                  lg: "200px",
                  md: "200px",
                  sm: "200px",
                  xs: "150px",
                },
                width: {
                  lg: "200px",
                  md: "200px",
                  sm: "200px",
                  xs: "150px",
                },
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
              <Box sx={{ pointerEvents: "none" }}>
                <StudentIcon style={{ height: "100px", width: "100px" }} />
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
          <Link
            component={NLink}
            sx={{ textDecoration: "none" }}
            to="/userrole_ver/teacher"
          >
            <Button
              id="Teacher"
              onClick={(e) => {handleChange(e); CreateRole()}}
              sx={{
                height: {
                  lg: "200px",
                  md: "200px",
                  sm: "200px",
                  xs: "150px",
                },
                width: {
                  lg: "200px",
                  md: "200px",
                  sm: "200px",
                  xs: "150px",
                },
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
              <Box sx={{ pointerEvents: "none" }}>
                <TeacherIcon style={{ height: "100px", width: "100px" }} />
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
