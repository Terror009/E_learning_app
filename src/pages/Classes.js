import React, { useState, useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
export default function Classes() {
  const [classes, SetClasses] = useState(0);
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.secondary.bg9,
      }}
    >
      <NavBar />
      <Box
        sx={{
          height: "100%",
          backgroundColor: (theme) => theme.palette.secondary.bg9,
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            },
            mt: "60px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "normal",
              color: (theme) => theme.palette.textColor.col1,
              mb: {
                lg: "0px",
                md: "0px",
                sm: "0px",
                xs: "20px",
              },
            }}
          >
            Your Classes
          </Typography>
          <Box component="span" sx={{ flexGrow: "1" }} />
          <Button
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
            }}
          >
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                color: (theme) => theme.palette.textColor.col2,
                textTransform: "capitalize",
              }}
            >
              Join a new class
            </Typography>
          </Button>
        </Box>
        {!classes ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
              width: "100%",
              backgroundColor: (theme) => theme.palette.secondary.bg9,
            }}
          >
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                fontSize: {
                  lg: "20px",
                  md: "20px",
                  sm: "20px",
                  xs: "18px",
                },
                color: (theme) => theme.palette.textColor.col4,
              }}
            >
              It looks like you don't join any classes...
            </Typography>
          </Box>
        ) : (
          ""
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            backgroundColor: (theme) => theme.palette.secondary.bg9,
          }}
        >
          <Typography
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "normal",
              fontSize: {
                lg: "14px",
                md: "14px",
                sm: "14px",
                xs: "12px",
              },
              color: (theme) => theme.palette.textColor.col4,
              textAlign: "center",
            }}
          >
            Assignments from these classes, if any, will be visible on the Home
            Page
          </Typography>
        </Box>
      </Box>

      <BottomNav />
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
            textAlign: "center",
            color: (theme) => theme.palette.textColor.col4,
          }}
        >
          Copyright © 2023 All Right Reserved
        </Typography>
      </Box>
    </Box>
  );
}
