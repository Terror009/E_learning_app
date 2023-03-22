import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { ReactComponent as YoutubeIcon } from "../../../assets/svg/youtube.svg";
import { ReactComponent as GoogleDriveIcon } from "../../../assets/svg/google-drive.svg";
import { ReactComponent as LinkIcon } from "../../../assets/svg/link.svg";
export default function Lesson() {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],

      ["clean"],
    ],
  };
  const format = [
    "bold",
    "italic",
    "underline",
    "align",
    "list",
    "indent",
    "size",
    "header",
    "color",
    "background",
    "clean",
  ];
  const [comment, SetComment] = useState({
    isOpen: false,
  });
  const [editor, SetEditor] = useState("");

  const handleChangeCommentOpen = () => {
    SetComment({ ...comment, isOpen: true });
  };

  const handleChangeCommentClose = () => {
    SetComment({ ...comment, isOpen: false });
    SetEditor("");
  };
  return (
    <Box>
      {!comment.isOpen ? (
        <Paper
          onClick={handleChangeCommentOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            height: "80px",
            width: "100%",
            mb: "20px",
            borderRadius: "10px",
            pointerEvents: "all",
            "&:hover": {
              ".text": {
                fontWeight: "bold",
                color: (theme) => theme.palette.textColor.col1,
              },
            },
          }}
        >
          <Avatar
            sx={{
              height: "45px",
              width: "45px",
              ml: {
                lg: "30px",
                md: "30px",
                sm: "30px",
                xs: "20px",
              },
              mr: "20px",
            }}
          />
          <Typography
            className="text"
            sx={{
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              color: (theme) => theme.palette.textColor.col4,
              pointerEvents: "none",
              transition: "0.2s ease",
            }}
          >
            Announce lesson to your class
          </Typography>
        </Paper>
      ) : (
        <Paper
          sx={{
            mb: "20px",
            padding: "20px",
          }}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              backgroundColor: (theme) => theme.palette.secondary.bg9,
              mb: "20px",
            }}
          >
            <ReactQuill
              theme="snow"
              value={editor}
              onChange={SetEditor}
              modules={modules}
              formats={format}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column",
              },
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: {
                  lg: "20%",
                  md: "20%",
                  sm: "20%",
                  xs: "100%",
                },
                backgroundColor: "",
              }}
            >
              <IconButton
                sx={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: (theme) => theme.palette.secondary.bg4,
                }}
              >
                <GoogleDriveIcon style={{ height: "30px", width: "30px" }} />
              </IconButton>
              <IconButton
                sx={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: (theme) => theme.palette.secondary.bg4,
                }}
              >
                <YoutubeIcon style={{ height: "30px", width: "30px" }} />
              </IconButton>
              <IconButton
                sx={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: (theme) => theme.palette.secondary.bg4,
                }}
              >
                <LinkIcon style={{ height: "30px", width: "30px" }} />
              </IconButton>
            </Box>
            <Box component="span" sx={{ flexGrow: "1" }} />
            <Box sx={{ display: "flex" }}>
              <Button onClick={handleChangeCommentClose}>
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col4,
                    textTransform: "capitalize",
                    "&:hover": {
                      color: (theme) => theme.palette.textColor.col1,
                    },
                  }}
                >
                  Cancel
                </Typography>
              </Button>
              <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.bg9,
                  borderRadius: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "bold",
                    color: (theme) => theme.palette.textColor.col4,
                    textTransform: "capitalize",
                  }}
                >
                  Post
                </Typography>
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
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
          All lesson will be visible here!!
        </Typography>
      </Box>
    </Box>
  );
}
