import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";

import { ReactComponent as MenuIcon } from "../../assets/svg/menu.svg";

import TeacherDrawer from "./TeacherDrawer";

import { useLocation } from "react-router-dom";
export default function TeacherNavBar() {
  const location = useLocation();

  const [drawer, SetDrawer] = useState({
    isOpen: false,
  });

  const handleChangeDrawerOpen = () => {
    SetDrawer({ ...drawer, isOpen: true });
  };

  const handleChangeDrawerClose = () => {
    SetDrawer({ ...drawer, isOpen: false });
  };

  return (
    <AppBar
      position="sticky"
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <IconButton
        onClick={handleChangeDrawerOpen}
        sx={{
          display: {
            lg: "none",
            md: "block",
            sm: "block",
            xs: "block",
          },
          height: "40px",
          width: "40px",
          padding: "5px",
          ml: "10px",
        }}
      >
        <MenuIcon style={{ height: "30px", width: "30px", color: "#2499E3" }} />
      </IconButton>
      <Toolbar>
        {location.pathname === "/teacherclasses" ? (
          <Typography
            sx={{
              display: { lg: "none", md: "none", sm: "none", xs: "block" },
              fontSize: "18px",
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col1,
            }}
          >
            My Classes
          </Typography>
        ) : (
          ""
        )}
      </Toolbar>
      <TeacherDrawer open={drawer.isOpen} onClose={handleChangeDrawerClose} />
    </AppBar>
  );
}
