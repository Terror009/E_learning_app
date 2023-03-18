import React, { useState } from "react";

import { Box, Paper, Typography, Button, Tab, Tabs } from "@mui/material";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";

import CurrentTabPanel from "../pages/components/activityTabPanel/CurrentTabPanel";
import CompleteTabPanel from "../pages/components/activityTabPanel/CompleteTabPanel";
import InCompleteTabPanel from "../pages/components/activityTabPanel/InCompleteTabPanel";

import { ReactComponent as CurrentIcon } from "../assets/svg/hourglass-running.svg";
import { ReactComponent as CompleteIcon } from "../assets/svg/hourglass-complete.svg";
import { ReactComponent as CreatedIcon } from "../assets/svg/page-delete.svg";

export default function Activity() {
  const [tablink, SetTablink] = useState(1);
  const [tablinks, SetTablinks] = useState(1);

  const handleChangeTab = (e) => {
    SetTablink(e.target.id);
    SetTablinks(e.target.id);
  };

  const step_data = [
    { tab_num: "0" },
    {
      tab_num: "1",
      label: "Current",
      component: <CurrentTabPanel />,
      icon: (
        <CurrentIcon
          style={{
            height: "20px",
            width: "20px",
            marginLeft: "5px",
            color: tablink === "1" ? "#26399C" : "#8A92A6",
            pointerEvents: "none",
            transition: "0.4s ease",
          }}
        />
      ),
    },
    {
      tab_num: "2",
      label: "Complete",
      component: <CompleteTabPanel />,
      icon: (
        <CompleteIcon
          style={{
            height: "19px",
            width: "19px",
            marginLeft: "5px",
            color: tablink === "2" ? "#26399C" : "#8A92A6",
            pointerEvents: "none",
            transition: "0.4s ease",
          }}
        />
      ),
    },
    {
      tab_num: "3",
      label: "Incomplete",
      component: <InCompleteTabPanel />,
      icon: (
        <CreatedIcon
          style={{
            height: "20px",
            width: "20px",
            marginLeft: "5px",
            color: tablink === "3" ? "#26399C" : "#8A92A6",
            pointerEvents: "none",
            transition: "0.4s ease",
          }}
        />
      ),
    },
  ];
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.secondary.bg9,
      }}
    >
      <NavBar />
      <Box sx={{ margin: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              lg: "flex-start",
              md: "flex-start",
              sm: "flex-start",
              xs: "center",
            },
          }}
        >
          {step_data
            .filter((index) => index.tab_num !== "0")
            .map((row, index) => (
              <Button
                key={index}
                onClick={handleChangeTab}
                id={row.tab_num}
                sx={{
                  width: {
                    lg: "150px",
                    md: "150px",
                    sm: "150px",
                    xs: "100%"
                  },
                  padding: {
                    lg: "20px",
                    md: "20px",
                    sm: "20px",
                    xs: "0px",
                  },
                  mb: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color:
                      tablink === row.tab_num 
                        ? (theme) => theme.palette.textColor.col1
                        : (theme) => theme.palette.textColor.col4,
                    pointerEvents: "none",
                  }}
                >
                  {row.label}
                </Typography>
                {row.icon}
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: {
                      lg: "0",
                      md: "0",
                      sm: "0",
                      xs: "-15px"
                    },
                    height: "4px",
                    width: "100%",
                    backgroundColor:
                      tablink === row.tab_num
                        ? (theme) => theme.palette.secondary.main
                        : "",
                    transition: "0.4s ease",
                    pointerEvents: "none",
                  }}
                />
              </Button>
            ))}
        </Box>
        <Box>{step_data[tablink].component}</Box>
      </Box>
      <BottomNav />
    </Box>
  );
}
