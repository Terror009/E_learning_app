import React, { useState, useEffect } from "react";

import { Box, Button, Typography, Paper, Avatar } from "@mui/material";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import StudentJoinClass from "./components/StudentJoinClass";

import UserImg from "../assets/png/user.png";

import "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  query,
  onSnapshot,
  where,
  collectionGroup,
} from "firebase/firestore";

export default function Classes() {
  const auth = getAuth();
  const db = getFirestore();

  const [classes, SetClasses] = useState([]);
  const [classjoined, SetClassJoined] = useState([]);
  const [modal, SetModal] = useState({
    isOpen: false,
  });

  const handleChangeClassModalOpen = () => {
    SetModal({ ...modal, isOpen: true });
  };

  const handleChangeClassModalClose = () => {
    SetModal({ ...modal, isOpen: false });
  };

  useEffect(() => {
    const getClassCode = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          var class_arr = [];
          const userRef = collection(db, `Users/${user.uid}/joined_class`);
          const q = query(userRef);
          onSnapshot(q, (snapshot) => {
            snapshot.forEach((docs) => {
              class_arr.push(docs.data().Class_code);
              SetClasses(class_arr);
            });
          });
        }
      });
    };
    getClassCode();
  }, [auth]);

  useEffect(() => {
    const getClass = () => {
      var class_arr = [];
      classes.map((doc_arr) => {
        const userRef = collection(db, "Classes");
        const q = query(userRef, where("classId", "==", doc_arr));
        onSnapshot(q, (snapshot) => {
          snapshot.forEach((docs) => {
            class_arr.push(docs.data());
            SetClassJoined(class_arr);
          });
        });
      });
    };
    getClass();
  }, [classes]);
  console.log(classjoined);
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.secondary.bg9,
      }}
    >
      <NavBar />
      <Box
        sx={{
          height: "100%",
          backgroundColor: (theme) => theme.palette.secondary.bg9,
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            },
            mt: "60px",
            mb: "20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "normal",
              color: (theme) => theme.palette.textColor.col1,
              mb: {
                lg: "0px",
                md: "0px",
                sm: "0px",
                xs: "20px",
              },
            }}
          >
            Your Classes
          </Typography>
          <Box component="span" sx={{ flexGrow: "1" }} />
          <Button
            onClick={handleChangeClassModalOpen}
            sx={{
              height: "40px",
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
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                color: (theme) => theme.palette.textColor.col2,
                textTransform: "capitalize",
              }}
            >
              Join a new class
            </Typography>
          </Button>
        </Box>
        {classjoined.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
              width: "100%",
              backgroundColor: (theme) => theme.palette.secondary.bg9,
            }}
          >
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                fontSize: {
                  lg: "20px",
                  md: "20px",
                  sm: "20px",
                  xs: "18px",
                },
                color: (theme) => theme.palette.textColor.col4,
              }}
            >
              It looks like you don't join any classes...
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
              padding: "20px 0px",
              backgroundColor: (theme) => theme.palette.secondary.bg9,
            }}
          >
            {classjoined.map((row, index) => (
              <Paper
                key={index}
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  height: "250px",
                  width: "350px",
                  overflow: "hidden",
                  borderRadius: "10px",
                  mb: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    height: "130px",
                    width: "100%",
                    backgroundColor: row.Class_Color_Code,
                  }}
                >
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      sx={{
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "normal",
                        fontSize: "28px",
                        color: (theme) => theme.palette.textColor.col2,
                        textTransform: "capitalize",
                        margin: "20px 0px 0px 20px",
                      }}
                    >
                      {row.Classname}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "normal",
                        color: (theme) => theme.palette.textColor.col2,
                        textTransform: "capitalize",
                        margin: "0px 0px 0px 20px",
                      }}
                    >
                      {row.Section}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: (theme) =>
                          theme.palette.typography.fontFamily,
                        fontWeight: "normal",
                        color: (theme) => theme.palette.textColor.col2,
                        textTransform: "capitalize",
                        margin: "5px 0px 0px 20px",
                      }}
                    >
                      {row.Teacher_proper_call +
                        " " +
                        row.TeacherFname +
                        " " +
                        row.TeacherLname}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Avatar
                      sx={{
                        height: "70px",
                        width: "70px",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: (theme) => theme.palette.common.white,
                        backgroundColor: (theme) => theme.palette.common.white,
                      }}
                      src={UserImg}
                    />
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "40px",
            width: "100%",
            backgroundColor: (theme) => theme.palette.secondary.bg9,
          }}
        >
          <Typography
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "normal",
              fontSize: {
                lg: "14px",
                md: "14px",
                sm: "14px",
                xs: "12px",
              },
              color: (theme) => theme.palette.textColor.col4,
              textAlign: "center",
            }}
          >
            Assignments from these classes, if any, will be visible on the Home
            Page
          </Typography>
        </Box>
      </Box>

      <BottomNav />
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
            textAlign: "center",
            color: (theme) => theme.palette.textColor.col4,
          }}
        >
          Copyright © 2023 All Right Reserved
        </Typography>
      </Box>
      <StudentJoinClass
        open={modal.isOpen}
        onClose={handleChangeClassModalClose}
      />
    </Box>
  );
}
