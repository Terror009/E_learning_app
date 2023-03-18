import React from "react";

import { Paper, Modal, IconButton, Typography } from "@mui/material";
import { ReactComponent as WarningIcon } from "../../assets/svg/warning.svg";
import { ReactComponent as CheckIcon } from "../../assets/svg/check-circle.svg";

export default function MessageDialog({ Open, onClose, message, icon }) {
  const isClose = () => {
    onClose();
  };
  return (
    <Modal
      
      open={Open}
      onClose={isClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        ml: window.location.pathname === "/teacherclasses" ? "15%" : "0px",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          width: {
            lg: "400px",
            md: "400px",
            sm: "400px",
            xs: "400px",
          },
          overflowX: {
            sm: "hidden",
            xs: "hidden",
          },
        }}
      >
        {icon ? (
          <CheckIcon
            style={{
              height: "90px",
              width: "90px",
              marginBottom: "20px",
              color: "#E8DD8E",
            }}
          />
        ) : (
          <WarningIcon
            style={{
              height: "90px",
              width: "90px",
              marginBottom: "20px",
              color: "#FF0000",
            }}
          />
        )}
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            fontSize: "20px",
            color: (theme) => theme.palette.textColor.col1,
          }}
        >
          {message}
        </Typography>
      </Paper>
    </Modal>
  );
}
