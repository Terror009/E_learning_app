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

import { motion } from "framer-motion";

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
    SetAvatar({ ...avatar, pic: "", pic_name: "" });
  };
  const Avatar_pic = (e) => {
    SetAvatar({ ...avatar, pic: e.target.src, pic_name: e.target.alt });
  };
  const metadata = {
    contentType: "image/png",
  };
  const PickAvatar = () => {};

  return (
    <Modal
      open={Open}
      onClose={isClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
            width: {
              lg: "600px",
              md: "600px",
              sm: "600px",
              xs: "90%",
            },
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
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column",
              },
              justifyContent: {
                lg: "space-around",
                md: "space-around",
                sm: "space-around",
                xs: "center",
              },
              alignItems: "center",
              height: {
                lg: "100px",
                md: "100px",
                sm: "100px",
                xs: "200px",
              },
              backgroundColor: (theme) => theme.palette.secondary.bg9,
              padding: "20px",
              boxShadow: "0px 5px 5px rgba(0,0,0,0.4)",
              zIndex: "1",
            }}
          >
            <Avatar
              sx={{
                height: "100px",
                width: "100px",
                marginRight: "20px",
                borderStyle: !avatar.pic ? "solid" : "none",
                borderWidth: "2px",
                borderColor: (theme) => theme.palette.secondary.main,
                mb: {
                  lg: "0px",
                  md: "0px",
                  sm: "0px",
                  xs: !avatar.pic_name ? "20px" : "0px",
                },
              }}
              src={!avatar.pic ? UserIcon : avatar.pic}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: {
                  lg: "0px",
                  md: "0px",
                  sm: "0px",
                  xs: "20px",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col4,
                  marginRight: "20px",
                  textTransform: "capitalize",
                  textAlign: {
                    lg: "left",
                    md: "left",
                    sm: "left",
                    xs: "center",
                  },
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
                  textAlign: {
                    lg: "left",
                    md: "left",
                    sm: "left",
                    xs: "center",
                  },
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
              width: "100%",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
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
                    height: {
                      lg: "120px",
                      md: "120px",
                      sm: "120px",
                      xs: "150px",
                    },
                    width: {
                      lg: "120px",
                      md: "120px",
                      sm: "120px",
                      xs: "150px",
                    },
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
                    mb: {
                      lg: "0px",
                      md: "0px",
                      sm: "0px",
                      xs:
                        row.label === "avatar_1" || row.label === "avatar_2"
                          ? "20px"
                          : "0px",
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
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      color: (theme) => theme.palette.textColor.col1,
                      textTransform: "capitalize",
                      fontSize: {
                        lg: "14px",
                        md: "14px",
                        sm: "14px",
                        xs: "16px",
                      },
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
                flexWrap: "wrap",
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
                    height: {
                      lg: "120px",
                      md: "120px",
                      sm: "120px",
                      xs: "150px",
                    },
                    width: {
                      lg: "120px",
                      md: "120px",
                      sm: "120px",
                      xs: "150px",
                    },
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
                    mb: {
                      lg: "0px",
                      md: "0px",
                      sm: "0px",
                      xs:
                        row.label === "avatar_5" || row.label === "avatar_6"
                          ? "20px"
                          : "0px",
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
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      color: (theme) => theme.palette.textColor.col1,
                      textTransform: "capitalize",
                      fontSize: {
                        lg: "14px",
                        md: "14px",
                        sm: "14px",
                        xs: "16px",
                      },
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
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                width: {
                  lg: "300px",
                  md: "300px",
                  sm: "300px",
                  xs: "100%",
                },
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
                    height: {
                      lg: "120px",
                      md: "120px",
                      sm: "120px",
                      xs: "150px",
                    },
                    width: {
                      lg: "120px",
                      md: "120px",
                      sm: "120px",
                      xs: "150px",
                    },
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
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      color: (theme) => theme.palette.textColor.col1,
                      textTransform: "capitalize",
                      fontSize: {
                        lg: "14px",
                        md: "14px",
                        sm: "14px",
                        xs: "16px",
                      },
                    }}
                  >
                    {row.label}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Modal>
  );
}
