import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Avatar,
  Button,
  FormControl,
  Badge,
  IconButton,
} from "@mui/material";

import ProfilePicDialog from "../../../ProfilePicDialog";

import UserIcon from "../../../../../assets/png/user.png";
import { ReactComponent as EditIcon } from "../../../../../assets/svg/edit.svg";

import "../../../../../utils/firebase";
import { Redirected, Status, UserType } from "../../../../../utils/userUrl";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

import { Navigate } from "react-router-dom";
export default function CreateProfile() {
  const auth = getAuth();
  const [modal, SetModal] = useState(false);
  const [payload, SetPayload] = useState({
    User_nickname: "",
  });
  const handleChangeModalOpen = () => {
    SetModal(true);
  };

  const handleChangeModalClose = () => {
    SetModal(false);
  };

  const handleChangeName = (prop) => (e) => {
    SetPayload({ ...payload, [prop]: e.target.value });
  };

  const CreateProfile = () => {};

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          width: { lg: "400px", md: "400px", sm: "300px", xs: "250px" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            color: (theme) => theme.palette.textColor.col4,
          }}
        >
          Create Profile
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "110px",
              width: "110px",
              marginBottom: "20px",
              borderStyle: "solid",
              borderWidth: "5px",
              borderColor: (theme) => theme.palette.secondary.main,
              borderRadius: "100px",
            }}
          >
            <Avatar
              sx={{
                height: "100px",
                width: "100px",
                borderStyle: "solid",
                borderWidth: "5px",
                borderColor: (theme) => theme.palette.common.white,
              }}
              src={UserIcon}
              alt="user_icon"
            />
            <IconButton
              onClick={handleChangeModalOpen}
              sx={{
                position: "absolute",
                bottom: "-5px",
                right: "-15px",
                backgroundColor: (theme) => theme.palette.common.white,
                borderStyle: "solid",
                borderWidth: "5px",
                borderColor: (theme) => theme.palette.common.white,
                marginBottom: "20px",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.common.white,
                  borderStyle: "solid",
                  borderWidth: "5px",
                  borderColor: (theme) => theme.palette.common.white,
                },
              }}
            >
              <EditIcon
                style={{ height: "20px", width: "20px", color: "#000000" }}
              />
            </IconButton>
          </Box>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              type="text"
              placeholder="Nickname"
              autoComplete="off"
              onChange={handleChangeName("User_nickname")}
              value={payload.User_nickname}
              fullWidth
              sx={{
                backgroundColor: (theme) => theme.palette.common.white,
                borderRadius: "10px",
                marginRight: "10px",
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
          </FormControl>
        </Box>
        <Button
          onClick={CreateProfile}
          sx={{
            height: "50px",
            backgroundColor: (theme) => theme.palette.secondary.main,
            boxShadow: "0px 6px 0px #26399C",
            borderRadius: "10px",
            transition: "0.3s ease",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: (theme) => theme.palette.secondary.bg7,
              transform: "translateY(10%)",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col2,
              textTransform: "capitalize",
            }}
          >
            Create
          </Typography>
        </Button>
      </Paper>
      <ProfilePicDialog Open={modal} onClose={handleChangeModalClose} />
    </Box>
  );
}
