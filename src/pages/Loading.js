import React from "react";

import HourglassGif from "../assets/gif/Hourglass.gif";

import { Box, Typography } from "@mui/material";
export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: (theme) => theme.palette.typography.fontFamily,
          fontWeight: "bold",
          color: (theme) => theme.palette.textColor.col4,
          marginBottom: "20px",
        }}
      >
        Quiz Bee
      </Typography>
      <Box component="img" src={HourglassGif} alt="loading" />
    </Box>
  );
}
