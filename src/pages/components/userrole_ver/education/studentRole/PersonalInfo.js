import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { month, day } from "../../../../../utils/date_picker";

import MessageDialog from "../../../MessageDialog";

import "../../../../../utils/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  query,
  onSnapshot,
  where,
  getDoc,
} from "firebase/firestore";

export default function PersonalInfo() {
  const auth = getAuth();
  const db = getFirestore();
  const [months, SetMonth] = useState("");
  const [days, SetDays] = useState("");
  const [year, SetYear] = useState("");
  const [payload, SetPayload] = useState({
    Phone_num: "",
    Age: "",
    Fname: "",
    Lname: "",
  });
  const [dialog, SetDialog] = useState({
    isOpen: false,
    message: "",
    icon: false,
  });

  const handleChange = (prop) => (e) => {
    SetPayload({ ...payload, [prop]: e.target.value });
  };
  const handleChangeMonth = (e) => {
    SetMonth(e.target.value);
  };

  const handleChangeDay = (e) => {
    SetDays(e.target.value);
  };

  const handleChangeYear = (e) => {
    SetYear(e.target.value);
  };

  const handleChangeDialogClose = () => {
    SetDialog({ ...dialog, isOpen: false });
  };
  const CreatePersonalInfo = () => {
    if (
      months === "" ||
      days === "" ||
      year === "" ||
      payload.Phone_num === "" ||
      payload.Age === ""
    ) {
      SetDialog({
        ...dialog,
        message: "Please enter value in fields",
        isOpen: true,
        icon: false,
      });
    } else {
      const userDoc = doc(db, "Users", auth.currentUser.uid);
      setDoc(
        userDoc,
        {
          Firstname: payload.Fname,
          Lastname: payload.Lname,
          Phonenumber: payload.Phone_num,
          Age: payload.Age,
          Birthday: { Day: days, Month: months, Year: year },
          Steps: "1",
        },
        { merge: true }
      );
    }
  };

  const currentYear = new Date().getFullYear();
  var fullyear = [];
  const minOffset = 0;
  const maxOffset = 60;
  for (let i = minOffset; i <= maxOffset; i++) {
    fullyear.push(currentYear - i);
  }

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 10;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          width: { lg: "400px", md: "400px", sm: "300px", xs: "300px" },
          backgroundColor: (theme) => theme.palette.secondary.bg9,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            color: (theme) => theme.palette.textColor.col4,
            marginBottom: "20px",
          }}
        >
          Personal Information
        </Typography>
        <Box sx={{ display: "flex", marginBottom: "20px" }}>
          <TextField
            type="text"
            autoComplete="off"
            placeholder="Firstname"
            onChange={handleChange("Fname")}
            value={payload.Fname}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.bg9,
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
          />
          <TextField
            type="text"
            autoComplete="off"
            placeholder="Lastname"
            onChange={handleChange("Lname")}
            value={payload.Lname}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.bg9,
              borderRadius: "10px",
              WebkitAppearance: "none",
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
        </Box>
        <Box sx={{ display: "flex", marginBottom: "20px" }}>
          <TextField
            type="tel"
            placeholder="Mobile Number"
            autoComplete="off"
            fullWidth
            onChange={handleChange("Phone_num")}
            value={payload.Phone_num}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.bg9,
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
          <TextField
            type="number"
            autoComplete="off"
            placeholder="Age"
            onChange={handleChange("Age")}
            value={payload.Age}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.bg9,
              borderRadius: "10px",
              WebkitAppearance: "none",
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
        </Box>
        <Box sx={{ display: "flex", marginBottom: "20px" }}>
          <FormControl fullWidth sx={{ marginRight: "10px", width: "450px" }}>
            <Select
              placeholder="Month"
              MenuProps={MenuProps}
              value={months}
              onChange={handleChangeMonth}
              sx={{
                borderRadius: "10px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: (theme) => theme.palette.secondary.main,
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col7,
              }}
            >
              {month.map((row) => (
                <MenuItem
                  value={row}
                  key={row}
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col4,
                  }}
                >
                  {row}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginRight: "10px", width: "250px" }}>
            <Select
              displayEmpty
              MenuProps={MenuProps}
              value={days}
              onChange={handleChangeDay}
              sx={{
                borderRadius: "10px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: (theme) => theme.palette.secondary.main,
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col7,
              }}
            >
              {day.map((row) => (
                <MenuItem
                  value={row}
                  key={row}
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col4,
                  }}
                >
                  {row}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              placeholder="Year"
              MenuProps={MenuProps}
              value={year}
              onChange={handleChangeYear}
              sx={{
                borderRadius: "10px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: (theme) => theme.palette.secondary.main,
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col7,
              }}
            >
              {fullyear.map((row) => (
                <MenuItem
                  value={row}
                  key={row}
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col1,
                  }}
                >
                  {row}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
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
          onClick={CreatePersonalInfo}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "normal",
              textTransform: "capitalize",
            }}
          >
            Create
          </Typography>
        </Button>
      </Paper>
      <MessageDialog
        Open={dialog.isOpen}
        message={dialog.message}
        onClose={handleChangeDialogClose}
        icon={dialog.icon}
      />
    </Box>
  );
}
