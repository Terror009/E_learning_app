import React, { useEffect, useState } from "react";

import { Button, Modal, Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

import "../../utils/firebase";
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
export default function DeleteClassModal({ open, onClose, classId }) {
  const auth = getAuth();
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

  const deleteClass = () => {
    const userDoc = doc(db, "Classes", class_id);
    const userRef = collection(db, "Classes");
    const q = query(userRef);
    onSnapshot(q, async (snapshot) => {
      if (snapshot.size >= 1) {
        try {
          await deleteDoc(userDoc)
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await deleteDoc(userDoc)
            .then(() => {
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      }
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
              fontSize: "20px",
              color: (theme) => theme.palette.textColor.col6,
            }}
          >
            Delete this class?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col6,
              mb: "20px"
            }}
          >
            Deleted class cannot be recovered
          </Typography>
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
