import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Modal,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Collapse,
} from "@mui/material";

import { motion } from "framer-motion";

import { ReactComponent as ExitIcon } from "../../assets/svg/exit.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/svg/down-arrow.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/svg/arrow-up.svg";
import {
  color_data,
  color_data1,
  color_data2,
  color_data3,
  full_color_data,
} from "../../utils/color_data";

import MessageDialog from "../components/MessageDialog";

import "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

export default function EditClass({
  Open,
  onClose,
  classId,
  classname,
  subject,
  section,
  color_code,
}) {
  const auth = getAuth();
  const db = getFirestore();

  const [dialog, SetDialog] = useState({
    isOpen: false,
    message: "",
    icon: false,
  });

  const [slide, SetSlide] = useState({
    isOpen: false,
  });

  const [payload, SetPayload] = useState({
    Classname: "",
    Subject: "",
    Section: "",
  });
  const [color, SetColor] = useState("");

  const isClose = () => {
    onClose();
    SetPayload({
      ...payload,
      Classname: classname,
      Subject: subject,
      Section: section,
    });
    SetColor(color_code);
  };

  const handleChange = (prop) => (e) => {
    SetPayload({ ...payload, [prop]: e.target.value });
  };

  const handleChangeColor = (e) => {
    SetColor(e.currentTarget.style.backgroundColor);
  };

  const handleChangeSlideOpen = () => {
    SetSlide({ ...slide, isOpen: true });
  };
  const handleChangeSlideClose = () => {
    SetSlide({ ...slide, isOpen: false });
  };

  useEffect(() => {
    const getData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          SetPayload({
            ...payload,
            Classname: classname,
            Subject: subject,
            Section: section,
          });
          SetColor(color_code);
        }
      });
    };
    getData();
  }, [classId]);
  const editClass = () => {};
  return (
    <Modal
      open={Open}
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
        <Paper
          sx={{
            width: { lg: "400px", md: "400px", sm: "400px", xs: "300px" },
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "normal",
              color: (theme) => theme.palette.textColor.col1,
              mb: "20px",
            }}
          >
            Edit Class Details
          </Typography>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              mb: "20px",
            }}
          >
            <TextField
              onChange={handleChange("Classname")}
              value={payload.Classname ? payload.Classname : ""}
              placeholder="Classname"
              fullWidth
              sx={{
                backgroundColor: (theme) => theme.palette.common.white,
                borderRadius: "10px",
                mr: "10px",
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
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
            {slide.isOpen ? (
              <Button
                onClick={handleChangeSlideClose}
                sx={{
                  borderRadius: "10px",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  height: "60px",
                  width: "25%",
                  borderColor: (theme) => theme.palette.secondary.main,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col7,
                }}
                endIcon={
                  <ArrowUpIcon
                    style={{ height: "12px", width: "12px", color: "#2499E3" }}
                  />
                }
              >
                <Box
                  component="span"
                  sx={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100px",
                    backgroundColor: color,
                  }}
                />
              </Button>
            ) : (
              <Button
                onClick={handleChangeSlideOpen}
                sx={{
                  borderRadius: "10px",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  height: "60px",
                  width: "25%",
                  borderColor: (theme) => theme.palette.secondary.main,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col7,
                }}
                endIcon={
                  <ArrowDownIcon
                    style={{ height: "12px", width: "12px", color: "#2499E3" }}
                  />
                }
              >
                <Box
                  component="span"
                  sx={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100px",
                    backgroundColor: color,
                  }}
                />
              </Button>
            )}
            <Collapse
              orientation="vertical"
              in={slide.isOpen}
              sx={{
                position: "absolute",
                top: "60px",
                right: "0px",
                zIndex: "1",
              }}
            >
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "200px",
                  width: "200px",
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow: "0px 5px 5px rgba(0,0,0,0.4)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    mb: "10px",
                  }}
                >
                  Class color code
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  {color_data.map((row, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "40px",
                        width: "40px",
                      }}
                    >
                      <Box
                        onClick={(e) => {
                          handleChangeColor(e);
                          handleChangeSlideClose();
                        }}
                        component="div"
                        sx={{
                          height: "25px",
                          width: "25px",
                          borderRadius: "100px",
                          backgroundColor: "",
                          transition: "0.2s ease",
                          "&:hover": {
                            height: "30px",
                            width: "30px",
                          },
                        }}
                        style={{ backgroundColor: row }}
                      ></Box>
                    </Box>
                  ))}
                  {color_data1.map((row, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "40px",
                        width: "40px",
                      }}
                    >
                      <Box
                        onClick={(e) => {
                          handleChangeColor(e);
                          handleChangeSlideClose();
                        }}
                        component="div"
                        sx={{
                          height: "25px",
                          width: "25px",
                          borderRadius: "100px",
                          transition: "0.2s ease",
                          "&:hover": {
                            height: "30px",
                            width: "30px",
                          },
                        }}
                        style={{ backgroundColor: row }}
                        bgcolor={row}
                      ></Box>
                    </Box>
                  ))}
                  {color_data2.map((row, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "40px",
                        width: "40px",
                      }}
                    >
                      <Box
                        onClick={(e) => {
                          handleChangeColor(e);
                          handleChangeSlideClose();
                        }}
                        component="div"
                        sx={{
                          height: "25px",
                          width: "25px",
                          borderRadius: "100px",
                          backgroundColor: row,
                          transition: "0.2s ease",
                          "&:hover": {
                            height: "30px",
                            width: "30px",
                          },
                        }}
                        style={{ backgroundColor: row }}
                      ></Box>
                    </Box>
                  ))}
                  {color_data3.map((row, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "40px",
                        width: "40px",
                      }}
                    >
                      <Box
                        onClick={(e) => {
                          handleChangeColor(e);
                          handleChangeSlideClose();
                        }}
                        component="div"
                        sx={{
                          height: "25px",
                          width: "25px",
                          borderRadius: "100px",
                          backgroundColor: row,
                          transition: "0.2s ease",
                          "&:hover": {
                            height: "30px",
                            width: "30px",
                          },
                        }}
                        style={{ backgroundColor: row }}
                      ></Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Collapse>
          </Box>
          <TextField
            onChange={handleChange("Subject")}
            value={payload.Subject ? payload.Subject : ""}
            placeholder="Subject"
            fullWidth
            sx={{
              backgroundColor: (theme) => theme.palette.common.white,
              borderRadius: "10px",
              mb: "20px",
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
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
          <TextField
            onChange={handleChange("Section")}
            value={payload.Section ? payload.Section : ""}
            placeholder="Section"
            fullWidth
            sx={{
              backgroundColor: (theme) => theme.palette.common.white,
              borderRadius: "10px",
              mb: "20px",
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
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
          <Button
            onClick={() => {
              editClass();
            }}
            fullWidth
            sx={{
              height: "40px",
              backgroundColor: (theme) => theme.palette.secondary.main,
              boxShadow: "0px 6px 0px #26399C",
              borderRadius: "10px",
              transition: "0.3s ease",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: (theme) => theme.palette.secondary.bg7,
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
              Create Class
            </Typography>
          </Button>
        </Paper>
      </motion.div>
    </Modal>
  );
}
