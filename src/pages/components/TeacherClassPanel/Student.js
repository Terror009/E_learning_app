import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Pagination,
  Stack,
  TextField,
  Divider,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";

import "../../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";

import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg";

export default function Student({ classId }) {
  const auth = getAuth();
  const db = getFirestore();

  const theme = useTheme();
  const [students, SetStudent] = useState([]);
  const [search, SetSearch] = useState({
    isSearch: "",
  });

  const handleChangeSearch = (prop) => (e) => {
    SetSearch({ ...search, [prop]: e.target.value });
  };
  const [currentWidth, SetCurrentWidth] = useState(window.innerWidth);

  const handleChangeWidth = () => {
    SetCurrentWidth(window.innerWidth);
  };
  useEffect(() => {
    const getWidth = () => {
      window.addEventListener("resize", handleChangeWidth);
    };
    getWidth();
  }, []);

  useEffect(() => {
    const getStudent = () => {
      var student_arr = [];
      const userRef = collection(db, `Classes/${classId}/Student`);
      const q = query(userRef);
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((docs) => {
          if (docs.exists) {
            student_arr.push(docs.data());
            SetStudent(student_arr);
          }
        });
      });
    };
    getStudent();
  }, [auth]);
  return (
    <Box sx={{ height: "100vh" }}>
      {students.length !== 0 ? (
        <Paper>
          <Box
            sx={{
              display: {
                lg: "flex",
                md: "flex",
                sm: "flex",
                xs: "none",
              },
              alignItems: "center",
              height: "70px",
            }}
          >
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                color: (theme) => theme.palette.textColor.col1,
                margin: "0px 70px 0px 20px",
              }}
            >
              Username
            </Typography>
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                color: (theme) => theme.palette.textColor.col1,
              }}
            >
              Email
            </Typography>
          </Box>
          <Divider orientation="horizontal" />
          {students.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "20px 0px",
                mb: "20px",
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
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    color: (theme) => theme.palette.textColor.col1,
                    margin: {
                      lg: "0px 70px 0px 20px",
                      md: "0px 70px 0px 20px",
                      sm: "0px 70px 0px 20px",
                      xs: "0px 0px 0px 10px",
                    },
                  }}
                >
                  {row.Nickname}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "16px",
                      xs: "12px",
                    },
                    color: (theme) => theme.palette.textColor.col1,
                    margin: {
                      lg: "0px",
                      md: "0px",
                      sm: "0px",
                      xs: "0px 0px 0px 10px",
                    },
                  }}
                >
                  {row.Student_Email}
                </Typography>
              </Box>
              <Box component="span" sx={{ flexGrow: "1" }} />

              <Box sx={{ display: "flex" }}>
                <IconButton
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.bg9,
                  }}
                >
                  <EditIcon
                    style={{
                      height: "15px",
                      width: "15px",
                      color: "#2499E3",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.bg9,
                    ml: "10px",
                    mr: "20px",
                  }}
                >
                  <DeleteIcon
                  className="delete"
                    style={{
                      height: "15px",
                      width: "15px",
                      color: "#ff0000",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            backgroundColor: (theme) => theme.palette.common.white,
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
            No students have joined your class yet!!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
              mb: "20px",
            }}
          >
            Invite students to get started!
          </Typography>
        </Box>
      )}
    </Box>
  );
}
