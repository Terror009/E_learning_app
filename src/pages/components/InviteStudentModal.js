import React, { useEffect, useState } from "react";

import {
  Modal,
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";

import { ReactComponent as CopyIcon } from "../../assets/svg/copy.svg";
export default function InviteStudentModal({ open, onClose, class_code }) {
  const isClose = () => {
    onClose();
    SetCopy("");
  };

  const str = "http://localhost:3000/classes/join_class=?" + class_code;

  const [Copy, SetCopy] = useState("");

  const CopyLink = () => {
    SetCopy(
      navigator.clipboard.writeText(
        "http://localhost:3000/classes/join_class=?" + class_code
      )
    );
  };

  console.log(Copy);
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
                  fontSize: "14px",
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
