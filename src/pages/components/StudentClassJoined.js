import React, { useState, useEffect } from "react";

import {
  Modal,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

import { motion } from "framer-motion";

import "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  where,
  query,
  getDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";

export default function StudentClassJoined({
  open,
  onClose,
  classname,
  subject,
  section,
  teacher_fname,
  teacher_lname,
  teacher_proper_call,
  classcode,
}) {
  const auth = getAuth();
  const db = getFirestore();

  const [payload, SetPayload] = useState({
    nickname: "",
    userUid: "",
    email: "",
  });

  const [user_email, SetEmail] = useState({
    email: "",
  });
  const [classes, SetClasses] = useState({
    classname: "",
    fname: "",
    lname: "",
    proper_call: "",
    subject: "",
    section: "",
  });

  const [code, SetCode] = useState({
    classcode: "",
  });

  const handleChange = (prop) => (e) => {
    SetEmail({ ...code, [prop]: e.target.value });
  };

  const isClose = () => {
    onClose();
    SetClasses({
      ...classes,
      fname: "",
      lname: "",
      proper_call: "",
      classname: "",
      subject: "",
      section: "",
    });
    SetCode({
      ...code,
      classcode: "",
    });
  };

  useEffect(() => {
    const getUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = collection(db, "Users");
          const q = query(userRef, where("userUid", "==", user.uid));

          onSnapshot(q, (snapshot) => {
            snapshot.forEach((docs) => {
              if (docs.exists) {
                SetPayload({
                  ...payload,
                  nickname: docs.data().nickname,
                  userUid: docs.data().userUid,
                });
              }
            });
          });
        }
      });
    };
    getUser();
  }, []);
  useEffect(() => {
    const getClassData = () => {
      SetClasses({
        ...classes,
        fname: teacher_fname,
        lname: teacher_lname,
        proper_call: teacher_proper_call,
        classname: classname,
        subject: subject,
        section: section,
      });
      SetCode({ ...code, classcode: classcode });
    };
    getClassData();
  }, [
    classname,
    teacher_fname,
    teacher_lname,
    teacher_proper_call,
    subject,
    section,
  ]);

  const joinClass = () => {
    const userRef = doc(
      db,
      `Classes/${code.classcode}/Student`,
      payload.userUid
    );
    setDoc(userRef, {
      Student_Email: user_email.email,
      Nickname: payload.nickname,
      Student_id: payload.userUid,
    });

    const userRef_1 = doc(
      db,
      `Users/${auth.currentUser.uid}/joined_class`,
      code.classcode
    );

    setDoc(userRef_1, {
      ClassTeacher:
        classes.proper_call + " " + classes.fname + " " + classes.lname,
      ClassSubject: classes.subject,
      ClassSection: classes.section,
      Classname: classes.classname,
      Class_code: code.classcode,
    }).then(() => {
      isClose();
      window.location.reload();
    });
  };
  return (
    <Modal
      open={open}
      onClose={isClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        ml: {
          lg: "15%",
          md: "0px",
          sm: "0px",
          xs: "0px",
        },
      }}
    >
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: { lg: "400px", md: "400px", sm: "400px", xs: "300px" },
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                color: (theme) => theme.palette.textColor.col1,
                mb: "20px",
              }}
            >
              You're joining the class:
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                color: (theme) => theme.palette.textColor.col1,
                fontWeight: "bold",
                mb: "20px",
              }}
            >
              {classes.classname}
            </Typography>
          </Box>
          <Divider orientation="horizontal" sx={{ mb: "20px" }} />
          <Box sx={{ display: "flex", mb: "20px" }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                color: (theme) => theme.palette.textColor.col1,
                fontWeight: "normal",
              }}
            >
              Your teacher,{" "}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                color: (theme) => theme.palette.textColor.col1,
                fontWeight: "bold",
              }}
            >
              {" " +
                classes.proper_call +
                " " +
                classes.fname +
                " " +
                classes.lname}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                color: (theme) => theme.palette.textColor.col1,
                fontWeight: "normal",
              }}
            >
              , will see the details below.
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
              fontWeight: "bold",
            }}
          >
            Your name
          </Typography>
          <Typography
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
              fontWeight: "normal",
              mb: "20px",
            }}
          >
            {payload.nickname}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
              fontWeight: "normal",
            }}
          >
            Please enter your email addresss
          </Typography>
          <TextField
            onChange={handleChange("email")}
            value={user_email.email}
            placeholder="Email Address"
            fullWidth
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
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={isClose}>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.palette.textColor.col4,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  "&:hover": {
                    color: (theme) => theme.palette.textColor.col7,
                  },
                }}
              >
                Cancel
              </Typography>
            </Button>
            <Button
              onClick={() => {
                joinClass();
              }}
              sx={{ backgroundColor: (theme) => theme.palette.secondary.bg9 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.palette.textColor.col7,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  "&:hover": {
                    color: (theme) => theme.palette.textColor.col4,
                  },
                }}
              >
                Join
              </Typography>
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Modal>
  );
}
