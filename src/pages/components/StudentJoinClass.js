import React, { useState, useEffect } from "react";

import {
  Modal,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { motion } from "framer-motion";

import StudentClassJoined from "./StudentClassJoined";
import MessageDialog from "./MessageDialog";

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
} from "firebase/firestore";

export default function StudentJoinClass({ open, onClose }) {
  const auth = getAuth();
  const db = getFirestore();

  const [classes, SetClasses] = useState({});

  const [code, SetCode] = useState({
    classcode: "",
  });

  const [allcode, SetAllCode] = useState([]);

  const [modal, SetModal] = useState({
    isOpen: false,
  });
  const [dialog, SetDialog] = useState({
    isOpen: false,
    message: "",
    icon: false,
  });

  const handleChange = (prop) => (e) => {
    SetCode({ ...code, [prop]: e.target.value });
  };

  const handleChangeClassModalOpen = () => {
    SetModal({ ...modal, isOpen: true });
  };

  const handleChangeClassModalClose = () => {
    SetModal({ ...modal, isOpen: false });
  };

  const handleChangeClassDialogOpen = () => {
    SetDialog({ ...dialog, isOpen: true });
  };

  const handleChangeClassDialogClose = () => {
    SetDialog({ ...dialog, isOpen: false });
  };

  const isClose = () => {
    onClose();
  };

  useEffect(() => {
    const getAllClassCode = () => {
      var code_arr = [];
      const userRef = collection(db, "Classes");
      const q = query(userRef);
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((docs) => {
          if (docs.exists) {
            code_arr.push(docs.data().classId);
            SetAllCode(code_arr);
          }
        });
      });
    };
    getAllClassCode();
  }, []);
  const getCodeClass = async () => {
    if (code.classcode === "") {
      SetDialog({
        ...dialog,
        isOpen: true,
        message: "Please enter the field",
        icon: false,
      });
    } else {
      const current_code = allcode.filter((index) =>
        index.includes(code.classcode)
      );

      if (current_code.length) {
        const userRef = collection(db, "Classes");
        const q = query(userRef, where("classId", "==", code.classcode));

        onSnapshot(q, (snapshot) => {
          snapshot.forEach((docs) => {
            if (docs.data().classId === code.classcode) {
              SetClasses(docs.data());
              if (classes) {
                handleChangeClassModalOpen();
              }
            }
          });
        });
      } else {
        SetDialog({
          ...dialog,
          isOpen: true,
          message: "Class Code not found",
          icon: false,
        });
      }
    }
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
          <Typography
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
              fontWeight: "bold",
              mb: "20px",
            }}
          >
            Join a Class
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
              mb: "20px",
            }}
          >
            Enter the class code that your teacher has shared with you.
          </Typography>
          <TextField
            onChange={handleChange("classcode")}
            value={code.classcode}
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
              onClick={() => getCodeClass()}
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
                Continue
              </Typography>
            </Button>
          </Box>
        </Paper>
        <StudentClassJoined
          open={modal.isOpen}
          onClose={handleChangeClassModalClose}
          classname={classes.Classname}
          teacher_fname={classes.TeacherFname}
          teacher_lname={classes.TeacherLname}
          teacher_proper_call={classes.Teacher_proper_call}
          classcode={classes.classId}
          subject={classes.Subject}
          section={classes.Section}
        />
        <MessageDialog
          Open={dialog.isOpen}
          message={dialog.message}
          icon={dialog.icon}
          onClose={handleChangeClassDialogClose}
        />
      </motion.div>
    </Modal>
  );
}
