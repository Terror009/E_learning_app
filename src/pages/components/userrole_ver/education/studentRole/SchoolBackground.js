import React, { useState } from "react";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import "../../../../../utils/firebase";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

import {
  schooltype,
  highSchoolYear,
  universityYear,
} from "../../../../../utils/school_data";

export default function SchoolBackground() {
  const auth = getAuth();
  const [schoolType, SetschollType] = useState("");
  const [highSchool, SethighSchool] = useState("");
  const [university, Setunversity] = useState("");

  const handleChangeSchoolType = (e) => {
    SetschollType(e.target.value);
  };

  const handleChangeHighSchool = (e) => {
    SethighSchool(e.target.value);
  };

  const handleChangeUniversity = (e) => {
    Setunversity(e.target.value);
  };

  const CreateSchoolBackground = () => {
    if (schoolType === "") {
      if (schoolType === "K12/High School") {
        console.log("empty_1");
      } else {
        console.log("empty_2");
      }
    } else {
      const db = getFirestore();
      const usersDoc = doc(db, "Users", auth.currentUser.uid);
      setDoc(
        usersDoc,
        {
          SchoolType: schoolType,
          SchoolLevel:
            schoolType === "K12/High School" ? highSchool : university,
          Steps: "2",
        },
        { merge: true }
      );
    }
  };
  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          width: { lg: "400px", md: "400px", sm: "300px", xs: "300px" },
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
          School Background
        </Typography>
        {/* <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <TextField
            type="text"
            autoComplete="off"
            placeholder="School Place"
            sx={{
              backgroundColor: (theme) => theme.palette.common.white,
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
                textTransform: "capitalize"
              },
            }}
          />
        </FormControl> */}
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <Select
            value={schoolType}
            onChange={handleChangeSchoolType}
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
            {schooltype.map((row) => (
              <MenuItem
                key={row}
                value={row}
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
        {schoolType === "" ? (
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Select
              disabled={true}
              value={""}
              sx={{
                borderRadius: "10px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: (theme) => theme.palette.secondary.main,
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col7,
              }}
            ></Select>
          </FormControl>
        ) : schoolType === "K12/High School" ? (
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Select
              value={highSchool}
              onChange={handleChangeHighSchool}
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
              {highSchoolYear.map((row) => (
                <MenuItem
                  key={row}
                  value={row}
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
        ) : (
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Select
              value={university}
              onChange={handleChangeUniversity}
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
              {universityYear.map((row) => (
                <MenuItem
                  key={row}
                  value={row}
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
        )}
        <Button
          onClick={CreateSchoolBackground}
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
    </Box>
  );
}
