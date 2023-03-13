import React, { useState } from "react";

import {
  Paper,
  Box,
  Button,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Link,
} from "@mui/material";
import { Link as NLink } from "react-router-dom";

import { ReactComponent as DegreeIcon } from "../../assets/svg/more-user.svg";
import { ReactComponent as ActivityIcon } from "../../assets/svg/recent.svg";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
export default function BottomNav() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 40,
        display: { lg: "none", md: "none", sm: "none", xs: "flex" },
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Paper
        
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "60px",
          width: "95%",
          borderRadius: "30px",
        }}
      >
        <Link component={NLink} to="/dashboard" sx={{ textDecoration: "none" }}>
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              padding: "0px 20px",
            }}
          >
            <HomeIcon
              style={{ height: "20px", width: "20px", color: "#26399C" }}
            />
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col1,
                textTransform: "capitalize",
              }}
            >
              Home
            </Typography>
          </Button>
        </Link>
        <Link component={NLink} to="/activity" sx={{ textDecoration: "none" }}>
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              padding: "0px 20px",
            }}
          >
            <ActivityIcon
              style={{ height: "20px", width: "20px", color: "#26399C" }}
            />
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col1,
                textTransform: "capitalize",
              }}
            >
              Activity
            </Typography>
          </Button>
        </Link>
        <Link component={NLink} to="/classes" sx={{ textDecoration: "none" }}>
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              padding: "0px 20px",
            }}
          >
            <DegreeIcon
              style={{ height: "20px", width: "20px", color: "#26399C" }}
            />
            <Typography
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col1,
                textTransform: "capitalize",
              }}
            >
              Classes
            </Typography>
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}
