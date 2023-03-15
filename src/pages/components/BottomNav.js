import React, { useState, useEffect } from "react";

import {
  Paper,
  Box,
  Button,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Link,
} from "@mui/material";
import { Link as NLink } from "react-router-dom";

import { ReactComponent as DegreeIcon } from "../../assets/svg/more-user.svg";
import { ReactComponent as ActivityIcon } from "../../assets/svg/recent.svg";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { motion } from "framer-motion";

import "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
export default function BottomNav() {
  const auth = getAuth();
  const db = getFirestore();
  const [payload, SetPayload] = useState({
    userrole: "",
  });

  useEffect(() => {
    const SetData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = collection(db, "Users");
          const q = query(userRef, where("userUid", "==", user.uid));
          onSnapshot(q, (querySnapShot) => {
            querySnapShot.forEach((docs) => {
              SetPayload({ ...payload, userrole: docs.data().userRole });
            });
          });
        }
      });
    };
    SetData();
  }, []);

  if (payload.userrole === "Student") {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 40,
          display: { lg: "none", md: "none", sm: "none", xs: "flex" },
          justifyContent: "center",
          width: "100%",
          backgroundColor: "red"
        }}
      >
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: "100%" }}
        >
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              height: "60px",
              width: "95%",
              borderRadius: "30px",
            }}
          >
            <Link
              component={NLink}
              to="/dashboard"
              sx={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                  padding: "0px 20px",
                }}
              >
                <HomeIcon
                  style={{ height: "20px", width: "20px", color: "#26399C" }}
                />
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  Home
                </Typography>
              </Button>
            </Link>
            <Link
              component={NLink}
              to="/activity"
              sx={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                  padding: "0px 20px",
                }}
              >
                <ActivityIcon
                  style={{ height: "20px", width: "20px", color: "#26399C" }}
                />
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  Activity
                </Typography>
              </Button>
            </Link>
            <Link
              component={NLink}
              to="/classes"
              sx={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                  padding: "0px 20px",
                }}
              >
                <DegreeIcon
                  style={{ height: "20px", width: "20px", color: "#26399C" }}
                />
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  Classes
                </Typography>
              </Button>
            </Link>
          </Paper>
        </motion.div>
      </Box>
    );
  } else if (payload.role === "Teacher") {
    return <></>;
  } else {
    return <></>;
  }
}
