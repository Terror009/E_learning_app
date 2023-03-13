import React, { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Modal,
  IconButton,
  TextField,
} from "@mui/material";

import {
  avatar_pic,
  avatar_pic_1,
  avatar_pic_2,
} from "../../utils/avatar_data";

import { ReactComponent as ExitIcon } from "../../assets/svg/exit.svg";

import UserIcon from "../../assets/png/user.png";
import "../../utils/firebase";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
export default function ProfilePicDialog({ Open, onClose }) {
  const auth = getAuth();
  const [avatar, SetAvatar] = useState({
    pic: null,
    pic_name: "",
  });
  const Maxnumber = 69;
  const isClose = () => {
    onClose();
  };
  const Avatar_pic = (e) => {
    SetAvatar({ ...avatar, pic: e.target.src, pic_name: e.target.alt });
  };
  const metadata = {
    contentType: "image/png",
  };
  const PickAvatar = () => {
  
  };
 
  return (
    <Modal
      open={Open}
      onClose={isClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "600px",
          width: "600px",
          overflow: "hidden",
          borderRadius: "15px",
          backgroundColor: (theme) => theme.palette.secondary.bg9,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "normal",
            color: (theme) => theme.palette.textColor.col4,
            marginTop: "20px",
          }}
        >
          Select your avatar
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100px",
            backgroundColor: (theme) => theme.palette.secondary.bg9,
            padding: "20px",
            boxShadow: "0px 5px 5px rgba(0,0,0,0.4)",
            zIndex: "1",
          }}
        >
          <Avatar
            sx={{
              height: avatar.pic === "" ? "100px" : "120px",
              width: avatar.pic === "" ? "100px" : "120px",
              marginRight: "20px",
              borderStyle: avatar.pic === "" ? "solid" : "none",
              borderWidth: "2px",
              borderColor: (theme) => theme.palette.secondary.main,
            }}
            src={avatar.pic === "" ? UserIcon : avatar.pic}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col4,
                marginRight: "20px",
                textTransform: "capitalize",
              }}
            >
              {avatar.pic_name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                color: (theme) => theme.palette.textColor.col4,
                marginRight: "20px",
              }}
            >
              You can choose your avatar that can describe your personality
            </Typography>
          </Box>
          <Button
            onClick={PickAvatar}
            sx={{
              height: "50px",
              width: "200px",
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
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col2,
                textTransform: "capitalize",
              }}
            >
              Pick this avatar
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "500px",
            width: "600px",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              margin: "20px 0px",
            }}
          >
            {avatar_pic.map((row, index) => (
              <Button
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "120px",
                  width: "120px",
                  borderRadius: "10px",
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: (theme) => theme.palette.secondary.bg5,
                  boxShadow: "0px 10px 0px rgba(0,0,0,0.3)",
                  transition: "0.5s ease",
                  "&:hover": {
                    boxShadow: "none",
                    transform: "translateY(10%)",
                  },
                }}
              >
                <Avatar
                  onClick={Avatar_pic}
                  src={row.image_pic}
                  alt={row.label}
                  sx={{ height: "90px", width: "90px" }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  {row.label}
                </Typography>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            {avatar_pic_1.map((row, index) => (
              <Button
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "120px",
                  width: "120px",
                  borderRadius: "10px",
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: (theme) => theme.palette.secondary.bg5,
                  boxShadow: "0px 10px 0px rgba(0,0,0,0.3)",
                  transition: "0.5s ease",
                  "&:hover": {
                    boxShadow: "none",
                    transform: "translateY(10%)",
                  },
                }}
              >
                <Avatar
                  onClick={Avatar_pic}
                  src={row.image_pic}
                  alt={row.label}
                  sx={{ height: "90px", width: "90px" }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  {row.label}
                </Typography>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "300px",
            }}
          >
            {avatar_pic_2.map((row, index) => (
              <Button
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "120px",
                  width: "120px",
                  borderRadius: "10px",
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: (theme) => theme.palette.secondary.bg5,
                  boxShadow: "0px 10px 0px rgba(0,0,0,0.3)",
                  transition: "0.5s ease",
                  "&:hover": {
                    boxShadow: "none",
                    transform: "translateY(10%)",
                  },
                  marginBottom: "20px",
                }}
              >
                <Avatar
                  onClick={Avatar_pic}
                  src={row.image_pic}
                  alt={row.label}
                  sx={{ height: "90px", width: "90px" }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    color: (theme) => theme.palette.textColor.col1,
                    textTransform: "capitalize",
                  }}
                >
                  {row.label}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
