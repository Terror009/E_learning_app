import React from "react";
import { Box, Typography, Button } from "@mui/material";
export default function Student() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: (theme) => theme.palette.common.white,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: (theme) => theme.palette.typography.fontFamily,
          color: (theme) => theme.palette.textColor.col1,
          mb: "20px",
        }}
      >
        No students have joined your class yet!!
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: (theme) => theme.palette.typography.fontFamily,
          color: (theme) => theme.palette.textColor.col1,
          mb: "20px",
        }}
      >
        Invite students to get started!
      </Typography>
    </Box>
  );
}
