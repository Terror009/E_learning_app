import React from "react";

import {
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  IconButton,
} from "@mui/material";
import { ReactComponent as WarningIcon } from "../../assets/svg/warning.svg";

export default function MessageDialog({ Open, onClose, message }) {
  const isClose = () => {
    onClose();
  };
  return (
    <Dialog open={Open} onClose={isClose}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          width: {
            lg: "500px",
            md: "500px",
            sm: "500px",
            xs: "500px",
          },
          overflowX: {
            sm: "hidden",
            xs: "hidden"
          }
        }}
      >
        <WarningIcon
          style={{
            height: "90px",
            width: "90px",
            marginBottom: "20px",
            color: "#FF0000",
          }}
        />
        <DialogContentText
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "bold",
            fontSize: "20px",
            color: (theme) => theme.palette.textColor.col1,
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
