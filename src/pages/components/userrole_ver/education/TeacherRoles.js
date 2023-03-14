import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import UserRoleNavBar from "../UserRoleNavBar";

import "../../../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function TeacherRoles() {
  const auth = getAuth();
  const [payload, SetPayload] = useState({
    Age: "",
    PhoneNumber: "",
    Fname: "",
    Lname: "",
    Proper_call: "",
    UserName: "",
  });
  const proper_name_call = ["Mr.", "Ms.", "Mrs."];

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 10;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const handleChange = (prop) => (e) => {
    SetPayload({ ...payload, [prop]: e.target.value });
  };

  useEffect(() => {
    const SetData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          SetPayload({ ...payload, UserName: user.displayName });
        }
      });
    };
    SetData();
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.primary.bg4,
      }}
    >
      <UserRoleNavBar />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: { lg: "450px", md: "450px", sm: "450px", xs: "300px" },
            backgroundColor: (theme) => theme.palette.secondary.bg9,
            padding: "20px",
            marginTop: "60px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "bold",
              color: (theme) => theme.palette.textColor.col4,
              mb: "20px",
            }}
          >
            Personal Information
          </Typography>
          <Box sx={{ display: "flex", mb: "20px" }}>
            <FormControl sx={{ width: "250px" }}>
              <Select
                MenuProps={MenuProps}
                onChange={handleChange("Proper_call")}
                value={payload.Proper_call}
                sx={{
                  borderRadius: "10px",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: (theme) => theme.palette.secondary.main,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col7,
                  mr: "10px",
                }}
              >
                {proper_name_call.map((row) => (
                  <MenuItem
                    key={row}
                    value={row}
                    sx={{
                      fontFamily: (theme) =>
                        theme.palette.typography.fontFamily,
                      fontWeight: "bold",
                      color: (theme) => theme.palette.textColor.col4,
                    }}
                  >
                    {row}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              placeholder="Firstname"
              onChange={handleChange("Fname")}
              value={payload.Fname}
              sx={{
                backgroundColor: (theme) => theme.palette.secondary.bg9,
                borderRadius: "10px",
                WebkitAppearance: "none",
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
                  height: "26px",
                },
              }}
            />
            <TextField
              fullWidth
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
                  height: "26px",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", mb: "20px" }}>
            <TextField
              fullWidth
              placeholder="Mobile Number"
              onChange={handleChange("PhoneNumber")}
              value={payload.PhoneNumber}
              sx={{
                backgroundColor: (theme) => theme.palette.secondary.bg9,
                borderRadius: "10px",
                WebkitAppearance: "none",
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
                  height: "26px",
                },
              }}
            />
            <TextField
              fullWidth
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
                  height: "26px",
                },
              }}
            />
          </Box>
          <TextField
            fullWidth
            placeholder="Username"
            onChange={handleChange("Username")}
            value={payload.UserName}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.bg9,
              borderRadius: "10px",
              WebkitAppearance: "none",
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
                height: "26px",
              },
            }}
          />
          <Button
            fullWidth
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
                fontWeight: "normal",
                textTransform: "capitalize",
              }}
            >
              Create
            </Typography>
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
