import React, { useState, useEffect } from "react";

import { Box, Paper, Typography, Button } from "@mui/material";
export default function CurrentTabPanel() {
  const [currentActivity, SetCurrentActivity] = useState(0);
  return (
    <Box sx={{ width: "100%" }}>
      {!currentActivity ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            width: "100%",
          }}
        >
          <Typography
          variant="h6"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "bold",
              textAlign: "center",
              color: (theme) => theme.palette.textColor.col4,
            }}
          >
            It looks like you don't have any activity...
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
