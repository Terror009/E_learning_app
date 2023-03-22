import React, { useState, useEffect } from "react";

import { Box, Paper, Typography, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";

import "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
export default function JoinClass() {
  const auth = getAuth();
  const db = getFirestore();
  const location = useLocation();
  const class_code = window.localStorage.getItem("class_code");
  useEffect(() => {
    const getClass = () => {
      const userRef = collection(db, "Classes");
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: (theme) => theme.palette.primary.bg4,
      }}
    >
      <Paper sx={{ height: "400px", width: "500px" }}>
        <Typography>You're joining at the class</Typography>
      </Paper>
    </Box>
  );
}
