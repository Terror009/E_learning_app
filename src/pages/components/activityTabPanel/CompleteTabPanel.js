import React, { useState, useEffect } from "react";

import { Box, Paper, Typography, Button } from "@mui/material";
export default function CompleteTabPanel() {
  const [completeActivity, SetCompleteActivity] = useState(0);
  return (
    <Box sx={{ width: "100%" }}>
      {!completeActivity ? (
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
            It looks like you don't have complete any activity...
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
