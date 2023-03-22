import React, { useState, useEffect } from "react";

import { Modal, Paper, Typography, TextField, Box } from "@mui/material";
import { motion } from "framer-motion";

import "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

export default function TeacherUpdateSettingModal({
  open,
  onClose,
  data,
  target,
}) {
  const [payload, SetPayload] = useState({
    Age: "",
    Phonenumber: "",
    fname: "",
    lname: "",
    proper_call: "",
    university: "",
    nickname: "",
    avatar: "",
  });

  const handleChange = (prop) => (e) => {
    SetPayload({ ...payload, [prop]: e.target.value });
  };

  const isClose = () => {
    onClose();
  };
  useEffect(() => {
    const getData = () => {

    }
  }, [target]);
  console.log(target);
  return (
    <Modal
      open={open}
      onClose={isClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ml: { lg: "15%", md: "0px", sm: "0px", xs: "0px" },
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
        {target === "name" ? (
          <Paper
            sx={{
              width: { lg: "400px", md: "400px", sm: "400px", xs: "300px" },
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <Typography>name</Typography>
          </Paper>
        ) : target === "username" ? (
          <Paper
            sx={{
              width: { lg: "400px", md: "400px", sm: "400px", xs: "300px" },
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <Typography>username</Typography>
          </Paper>
        ) : (
          <Paper
            sx={{
              width: { lg: "400px", md: "400px", sm: "400px", xs: "300px" },
              padding: "20px",
              borderRadius: "15px",
            }}
          ></Paper>
        )}
      </motion.div>
    </Modal>
  );
}
