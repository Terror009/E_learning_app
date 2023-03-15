import React, { useState, useEffect } from "react";

import { Box, Paper, Typography, Button } from "@mui/material";
export default function InCompleteTabPanel() {
  const [incompleteActivity, SetInCompleteActivity] = useState(0);
  return (
    <Box sx={{ width: "100%" }}>
      {!incompleteActivity ? (
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
            Congrats you complete all activity...
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
