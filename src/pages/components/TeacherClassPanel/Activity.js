import React from "react";
import { Box, Typography, Button } from "@mui/material";
export default function Activity() {
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
        No activity assigned yet!!
      </Typography>
      <Button
        sx={{
          height: "40px",
          width: {
            lg: "150px",
            md: "150px",
            sm: "150px",
            xs: "100%",
          },
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
            color: (theme) => theme.palette.textColor.col2,
            textTransform: "capitalize",
          }}
        >
          Create Activity
        </Typography>
      </Button>
    </Box>
  );
}
