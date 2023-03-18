import React from "react";
import { Box, Paper, Typography, AppBar, Toolbar } from "@mui/material";

import TeacherDashboardDrawer from "./components/TeacherDashboardDrawer";
export default function TeacherReport() {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.secondary.bg9,
        display: "flex",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: {
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
          },
          height: "100vh",
          width: "200px",

          backgroundColor: "red",
          zIndex: 10000,
        }}
      >
        <TeacherDashboardDrawer />
      </Box>
      <Box
        sx={{
          postion: "relative",
          display: "flex",
          flexDirection: "column",
          width: "90%",
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <Typography>Quiz Bee</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ height: "100%" }}></Box>
        <Box
          sx={{
            padding: "20px",
            height: "20px",
            backgroundColor: (theme) => theme.palette.common.white,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "600",
              color: (theme) => theme.palette.textColor.col4,
            }}
          >
            Copyright © 2023 All Right Reserved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
