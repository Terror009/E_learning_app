import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  MobileStepper,
  useTheme,
} from "@mui/material";

import UserRoleNavBar from "../UserRoleNavBar";
import { ReactComponent as ArrowLeftIcon } from "../../../../assets/svg/arrow_left.svg";
import { ReactComponent as ArrowRightIcon } from "../../../../assets/svg/arrow_right.svg";

import PersonalInfo from "./studentRole/PersonalInfo";
import CreateProfile from "./studentRole/CreateProfile";
import SchoolBackground from "./studentRole/SchoolBackground";

import "../../../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  getFirestore,
  doc,
  query,
  collection,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const step_data = [
  {
    step_num: "1",
    label: "Personal Information",
    step_com: <PersonalInfo />,
  },
  {
    step_num: "2",
    label: "Educational Background",
    step_com: <SchoolBackground />,
  },
  { step_num: "3", label: "Create Profile", step_com: <CreateProfile /> },
];

export default function StudentRoles() {
  const themes = useTheme();
  const auth = getAuth();
  const [activeStep, SetActiveStep] = useState(0);
  const maxSteps = step_data.length;
  const handleNext = () => {
    SetActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    SetActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const SetData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const db = getFirestore();
          const usersDoc = doc(db, "Users", user.uid);

          const userRef = collection(db, "Users");
          const q = query(userRef);
          onSnapshot(q, (querySnapShot) => {
            querySnapShot.forEach((doc) => { 
              if (!doc.data().userRole) {
                setDoc(
                  usersDoc,
                  {
                    userRole: "Student",
                  },
                  { merge: true }
                );
                  
              } else {
                SetActiveStep(doc.data().Steps);
              }
            });
          });
        } else {
          console.log("error");
        }
      });
    };
    SetData();
  }, []);
  return (
    <Box>
      <UserRoleNavBar />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "90vh",
          backgroundColor: (theme) => theme.palette.primary.bg4,
          padding: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            color: (theme) => theme.palette.textColor.col4,
            marginLeft: "5px",
            marginBottom: "20px",
          }}
        >
          {step_data[activeStep].step_num} Step of 3
        </Typography>

        <Box sx={{ marginBottom: "20px" }}>
          {step_data[activeStep].step_com}
        </Box>
    {/*     <Box
          sx={{
            display: "flex",
            width: { lg: "400px", md: "400px", sm: "300px", xs: "300px" },
            padding: "10px 20px",
          }}
        >
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="body1"
            sx={{
              height: "50px",
              backgroundColor:
                activeStep === 0
                  ? (theme) => theme.palette.secondary.bg7
                  : (theme) => theme.palette.secondary.main,
              boxShadow: activeStep === 0 ? "none" : "0px 6px 0px #26399C",
              transform:
                activeStep === 0 ? "translateY(10%)" : "translateY(0%)",
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
                color:
                  activeStep === 0
                    ? (theme) => theme.palette.textColor.col4
                    : (theme) => theme.palette.textColor.col2,
              }}
            >
              Back
            </Typography>
          </Button>
          <Box component="span" sx={{ flexGrow: "1" }} />
          {activeStep === 2 ? (
            <Button
              sx={{
                height: "50px",
                backgroundColor: (theme) => theme.palette.secondary.bg12,
                boxShadow: "0px 6px 0px #850000",

                borderRadius: "10px",
                transition: "0.3s ease",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: (theme) => theme.palette.secondary.bg13,
                  transform: "translateY(10%)",
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col2,
                }}
              >
                Finish
              </Typography>
            </Button>
          ) : (
            <Button
              disabled={activeStep === maxSteps - 1}
              onClick={handleNext}
              sx={{
                height: "50px",
                width: "70px",
                backgroundColor:
                  activeStep === maxSteps - 1
                    ? (theme) => theme.palette.secondary.bg13
                    : (theme) => theme.palette.secondary.bg12,
                boxShadow:
                  activeStep === maxSteps - 1 ? "none" : "0px 6px 0px #850000",
                transform:
                  activeStep === maxSteps - 1
                    ? "translateY(10%)"
                    : "translateY(0%)",
                borderRadius: "10px",
                transition: "0.3s ease",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: (theme) => theme.palette.secondary.bg13,
                  transform: "translateY(10%)",
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col2,
                }}
              >
                Next
              </Typography>
            </Button>
          )}
        </Box> */}
      </Box>
    </Box>
  );
}
