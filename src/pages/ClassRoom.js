import React, { useState, useEffect } from "react";

import { Box, Paper, IconButton, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ArrwoLeftIcon } from "../assets/svg/arrow_left.svg";
import { ReactComponent as AddUserIcon } from "../assets/svg/user-plus.svg";

import TeacherDashboardDrawer from "./components/TeacherDashboardDrawer";
import TeacherNavBar from "./components/TeacherNavBar";

import Lesson from "../pages/components/TeacherClassPanel/Lesson";
import Activity from "../pages/components/TeacherClassPanel/Activity";
import Student from "./components/TeacherClassPanel/Student";
import InviteStudentModal from "./components/InviteStudentModal";

import "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

export default function ClassRoom({ open, onClose }) {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const class_code = window.localStorage.getItem("code");

  const [classes, SetClass] = useState({});

  const [tabs, SetTabs] = useState(1);

  const [modal, SetModal] = useState({
    isOpen: false,
  });

  const tabs_data = [
    { tab_num: "0" },
    { tab_num: "1", label: "Lesson", component: <Lesson /> },
    { tab_num: "2", label: "Activity", component: <Activity /> },
    { tab_num: "3", label: "Student", component: <Student /> },
  ];

  const handleChangeTab = (e) => {
    SetTabs(e.target.id);
  };

  const handleChangeModalOpen = () => {
    SetModal({ ...modal, isOpen: true });
  };

  const handleChangeModalClose = () => {
    SetModal({ ...modal, isOpen: false });
  };

  useEffect(() => {
    const getClassData = () => {
      onAuthStateChanged(auth, (user) => {
        const userRef = collection(db, "Classes");
        const q = query(userRef, where("classId", "==", class_code));
        onSnapshot(q, (snapshot) => {
          snapshot.forEach((docs) => {
            if (docs.exists) {
              SetClass(docs.data());
            }
          });
        });
      });
    };
    getClassData();
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
        {class_code ? (
          <Box
            sx={{
              padding: {
                lg: "20px 40px",
                md: "20px 40px",
                sm: "20px 40px",
                xs: "20px 20px",
              },
              backgroundColor: (theme) => theme.palette.secondary.bg9,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
              <IconButton
                onClick={() => {
                  navigate("/teacherclasses");
                  window.localStorage.clear();
                }}
              >
                <ArrwoLeftIcon style={{ height: "25px", width: "25px" }} />
              </IconButton>
              <Typography
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  color: (theme) => theme.palette.textColor.col1,
                }}
              >
                Back to All Classes
              </Typography>
            </Box>
            <Box sx={{ mb: "20px" }}>
              <Paper
                sx={{
                  display: "flex",
                  height: "150px",
                  width: "100%",
                  backgroundColor: classes.Class_Color_Code,
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      margin: "20px 0px 0px 20px",
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      color: (theme) => theme.palette.textColor.col2,
                    }}
                  >
                    {classes.Classname}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      margin: "0px 0px 0px 20px",
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      color: (theme) => theme.palette.textColor.col2,
                    }}
                  >
                    {classes.Section}
                  </Typography>
                  <Box component="span" sx={{ flexGrow: "1" }} />
                  <Typography
                    sx={{
                      margin: "0px 0px 10px 20px",
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      color: (theme) => theme.palette.textColor.col2,
                    }}
                  >
                    0 Student
                  </Typography>
                </Box>
                <Box component="span" sx={{ flexGrow: "1" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "50%",
                    backgroundColor: "",
                  }}
                >
                  <Button
                    onClick={handleChangeModalOpen}
                    sx={{
                      height: "40px",
                      width: {
                        lg: "150px",
                        md: "150px",
                        sm: "150px",
                        xs: "100%",
                      },
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      boxShadow: "0px 6px 0px #26399C",
                      borderRadius: "10px",
                      transition: "0.3s ease",
                      "&:hover": {
                        boxShadow: "none",
                        backgroundColor: (theme) => theme.palette.secondary.bg7,
                        transform: "translateY(10%)",
                      },
                      mr: "20px",
                    }}
                    startIcon={
                      <AddUserIcon style={{ height: "20px", width: "20px" }} />
                    }
                  >
                    <Typography
                      sx={{
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        color: (theme) => theme.palette.textColor.col2,
                        textTransform: "capitalize",
                      }}
                    >
                      Add Students
                    </Typography>
                  </Button>
                </Box>
              </Paper>
            </Box>
            <Box>
              {tabs_data
                .filter((index) => index.tab_num !== "0")
                .map((row, index) => (
                  <Button
                    onClick={handleChangeTab}
                    id={row.tab_num}
                    key={index}
                    sx={{
                      width: {
                        lg: "150px",
                        md: "150px",
                        sm: "150px",
                        xs: "100%",
                      },
                      padding: {
                        lg: "20px",
                        md: "20px",
                        sm: "20px",
                        xs: "0px",
                      },
                      mb: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        color:
                          tabs === row.tab_num
                            ? (theme) => theme.palette.textColor.col1
                            : (theme) => theme.palette.textColor.col4,
                        pointerEvents: "none",
                      }}
                    >
                      {row.label}
                    </Typography>

                    <Box
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: {
                          lg: "0",
                          md: "0",
                          sm: "0",
                          xs: "-15px",
                        },
                        height: "4px",
                        width: "100%",
                        borderRadius: "10px 10px 0px 0px",
                        backgroundColor:
                          tabs === row.tab_num
                            ? (theme) => theme.palette.secondary.main
                            : "",
                        transition: "0.4s ease",
                        pointerEvents: "none",
                      }}
                    />
                  </Button>
                ))}
            </Box>
            <Box>{tabs_data[tabs].component}</Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
              }}
            >
              Something wrong class is not found
            </Typography>
          </Box>
        )}
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
        <InviteStudentModal
          open={modal.isOpen}
          onClose={handleChangeModalClose}
          class_code={class_code}
        />
      </Box>
    </Box>
  );
}
