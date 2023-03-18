import React, { useEffect, useState } from "react";

import { Button, Modal, Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

import "../../utils/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
export default function DeleteClassModal({ open, onClose, classId }) {
  const db = getFirestore();
  const isClose = () => {
    onClose();
  };

  const [class_id, SetClassId] = useState("");

  useEffect(() => {
    const getData = () => {
      SetClassId(classId);
    };
    getData();
  }, [classId]);

  const deleteClass = async () => {
    console.log(class_id);
    const userDoc = doc(db, "Classes", class_id);
    try {
      await deleteDoc(userDoc)
        .then(() => {
          
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
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
        ml: "15%",
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
        <Paper sx={{ width: "400px", padding: "20px", borderRadius: "15px" }}>
          <Typography>Delete this class?</Typography>
          <Typography>Deleted class cannot be recovered</Typography>
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={isClose}
              fullWidth
              sx={{
                height: "40px",
                backgroundColor: (theme) => theme.palette.secondary.main,
                boxShadow: "0px 6px 0px #26399C",
                borderRadius: "10px",
                transition: "0.3s ease",
                mr: "20px",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  transform: "translateY(10%)",
                },
                mb: "20px",
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.textColor.col2,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                  textTransform: "capitalize",
                }}
              >
                Cancel
              </Typography>
            </Button>
            <Button
              onClick={() => {
                isClose();
                deleteClass();
              }}
              fullWidth
              sx={{
                height: "40px",
                backgroundColor: (theme) => theme.palette.secondary.bg15,
                boxShadow: "0px 6px 0px #8b0000",
                borderRadius: "10px",
                transition: "0.3s ease",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: (theme) => theme.palette.secondary.bg15,
                  transform: "translateY(10%)",
                },
                mb: "20px",
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.textColor.col2,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                  textTransform: "capitalize",
                }}
              >
                Delete
              </Typography>
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Modal>
  );
}
