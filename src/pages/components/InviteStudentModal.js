import React, { useEffect, useState } from "react";

import {
  Modal,
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";

import { ReactComponent as CopyIcon } from "../../assets/svg/copy.svg";

import "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { Stack } from "@mui/system";

export default function InviteStudentModal({ open, onClose, class_code }) {
  const auth = getAuth();
  const db = getFirestore();

  const isClose = () => {
    onClose();
    SetCopy("");
  };

  const str =
    "https://e-learning-app-two.vercel.app/classes/join_class=?" + class_code;

  const [Copy, SetCopy] = useState("");
  const [Student, SetStudent] = useState([]);
  const [search, SetSearch] = useState({
    isSearch: "",
  });
  const [addStudent, SetAddStudent] = useState([]);
  useEffect(() => {
    const getUserData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          var student_arr = [];

          const userRef = collection(db, "Users");
          const q = query(userRef, where("userRole", "==", "Student"));
          onSnapshot(q, (snapshot) => {
            snapshot.forEach((docs) => {
              if (docs.exists) {
                try {
                  student_arr.push(docs.data());
                  SetStudent(student_arr);
                } catch (err) {
                  console.log(err);
                }
              }
            });
          });
        }
      });
    };
    getUserData();
  }, []);

  const CopyLink = () => {
    SetCopy(
      navigator.clipboard.writeText(
        "https://e-learning-app-two.vercel.app/classes/join_class=?" +
          class_code
      )
    );
  };

  const handleSearch = (prop) => (e) => {
    SetSearch({ ...search, [prop]: e.target.value });
  };

  const addStudents = (data) => {
    var arr = [];
    arr.push(data);
    SetAddStudent((addStudent) => [...addStudent, arr]);
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
              textTransform: "capitalize",
              mb: "20px",
            }}
          >
            Invite some students in this class
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
              fontWeight: "normal",
              textTransform: "capitalize",
            }}
          >
            Share this class link to your students
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
              backgroundColor: (theme) => theme.palette.secondary.main,
              borderRadius: "10px",
              mb: "40px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                overflow: "auto",
                backgroundColor: "",
              }}
            >
              <Typography
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontSize: {
                    lg: "14px",
                    md: "14px",
                    sm: "14px",
                    xs: "10px",
                  },
                  fontWeight: "lighter",
                  color: (theme) => theme.palette.textColor.col2,
                  ml: "20px",
                }}
              >
                {str.length > 37 ? `${str.substring(0, 40)}...` : str}
              </Typography>
            </Box>
            <Box component="span" sx={{ flexGrow: "1" }} />
            {Copy ? (
              <Typography
                variant="body2"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  color: (theme) => theme.palette.textColor.col2,
                  mr: "20px",
                }}
              >
                Copied!!
              </Typography>
            ) : (
              <IconButton sx={{ mr: "10px" }} onClick={CopyLink}>
                <CopyIcon
                  style={{ height: "30px", width: "30px", color: "#fff" }}
                />
              </IconButton>
            )}
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
              fontWeight: "normal",
              textTransform: "capitalize",
            }}
          >
            Share this class code to your students
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
              backgroundColor: (theme) => theme.palette.secondary.main,
              borderRadius: "10px",
              mb: "10px",
            }}
          >
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                color: (theme) => theme.palette.textColor.col2,
              }}
            >
              {class_code}
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Modal>
  );
}
