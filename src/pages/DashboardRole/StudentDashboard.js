import React, { useEffect, useState } from "react";

import {
  Box,
  AppBar,
  Toolbar,
  Paper,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  Link,
} from "@mui/material";

import { Link as NLink } from "react-router-dom";
import "../../utils/firebase";
import { getAuth } from "firebase/auth";

export default function StudentDashboard() {
  const auth = getAuth();
  const [payload, SetPayload] = useState({
    email: "",
    username: "",
    nousername: "",
  });
  const [activity, SetActivity] = useState(0);
  const [classes, SetClasses] = useState(0);
  useEffect(() => {
    const SetData = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          SetPayload({
            ...payload,
            username: user.displayName,
            email: user.email,
          });
        } else {
          SetPayload({
            ...payload,
            nousername: "create account",
          });
        }
      });
    };
    SetData();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "linen",
        position: "relative",
        padding: {
          lg: "20px 20px",
          md: "20px 20px",
          sm: "20px 20px",
          xs: "20px 10px",
        },
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
          justifyContent: "space-around",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: {
              lg: "60%",
              md: "60%",
              sm: "60%",
              xs: "100%",
            },
            mb: {
              lg: "0px",
              md: "0px",
              sm: "0px",
              xs: "20px",
            },
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
              padding: {
                lg: "5px",
                md: "5px",
                sm: "5px",
                xs: "10px",
              },
              width: {
                lg: "400px",
                md: "400px",
                ms: "90%",
                xs: "90%",
              },
              backgroundColor: (theme) => theme.palette.secondary.bg3,
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: (theme) => theme.palette.secondary.bg8,
              borderRadius: "15px",
            }}
          >
            <TextField
              placeholder="Enter a join code"
              fullWidth
              sx={{
                backgroundColor: (theme) => theme.palette.common.white,
                borderRadius: "10px",
                outline: "none",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2) inset",
                mb: {
                  lg: "0px",
                  md: "0px",
                  sm: "0px",
                  xs: "10px",
                },
                "& label.Mui-focused": {
                  borderColor: "transparent",
                  borderRadius: "10px",
                },
                "& .MuiInput-underline:after": {
                  borderColor: "transparent",
                  borderRadius: "10px",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                    borderRadius: "10px",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                    borderRadius: "10px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                    borderRadius: "10px",
                  },
                },
                input: {
                  color: (theme) => theme.palette.textColor.col7,
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                },
              }}
            />
            <Button
              sx={{
                height: "52px",
                backgroundColor: (theme) => theme.palette.secondary.main,
                marginLeft: {
                  lg: "5px",
                  md: "5px",
                  sm: "5px",
                  xs: "0px",
                },
                borderRadius: "10px",
                boxShadow: "0px 4px 0px #26399C",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.bg8,
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                }}
              >
                Join
              </Typography>
            </Button>
          </Box>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: {
              lg: "35%",
              md: "35%",
              sm: "35%",
              xs: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "20px",
              width: "200px",
              backgroundColor: "yellow",
              padding: "15px 5px",
              borderRadius: "30px",
            }}
          >
            <Avatar
              sx={{
                height: "35px",
                width: "35px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: (theme) => theme.palette.secondary.bg7,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "bold",
              }}
            >
              {auth.currentUser ? payload.username : payload.nousername}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Link
              component={NLink}
              to="/setting"
              sx={{ textDecoration: "none" }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col7,
                }}
              >
                Edit Profile
              </Typography>
            </Link>
            <Box
              sx={{
                height: "3px",
                width: "3px",
                backgroundColor: (theme) => theme.palette.secondary.bg7,
                borderRadius: "100px",
                margin: "0px 6px",
              }}
            ></Box>
            <Link
              component={NLink}
              to="/activity"
              sx={{ textDecoration: "none" }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.textColor.col7,
                }}
              >
                View Activity
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          backgroundColor: "",
          padding: {
            lg: "10px",
            md: "10px",
            sm: "10px",
            xs: "0px",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "600",
            color: (theme) => theme.palette.textColor.col7,
            marginBottom: "20px",
            marginTop: {
              lg: "0px",
              md: "0px",
              sm: "0px",
              xs: "20px",
            },
          }}
        >
          Recent Activity
        </Typography>
        {!activity ? (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: (theme) => theme.palette.textColor.col7,
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              It looks like you don't have recent activity
            </Typography>
            <Link
              component={NLink}
              to="/activity"
              sx={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  height: "45px",
                  width: "150px",
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "30px",
                  boxShadow: "0px 4px 0px #26399C",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.secondary.bg8,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "normal",
                  }}
                >
                  Find Activity
                </Typography>
              </Button>
            </Link>
          </Paper>
        ) : (
          <Paper></Paper>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: "",
          padding: {
            lg: "10px",
            md: "10px",
            sm: "10px",
            xs: "0px",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: (theme) => theme.palette.typography.fontFamily,
            fontWeight: "600",
            color: (theme) => theme.palette.textColor.col7,
            marginBottom: "20px",
            marginTop: {
              lg: "0px",
              md: "0px",
              sm: "0px",
              xs: "20px",
            },
          }}
        >
          Classes
        </Typography>
        {!classes ? (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: (theme) => theme.palette.textColor.col7,
                fontFamily: (theme) => theme.palette.typography.fontFamily,
                fontWeight: "normal",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              It looks like you don't have join classes yet!!
            </Typography>
            <Link
              component={NLink}
              to="/classes"
              sx={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  height: "45px",
                  width: "150px",
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "30px",
                  boxShadow: "0px 4px 0px #26399C",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.secondary.bg8,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (theme) => theme.palette.typography.fontFamily,
                    fontWeight: "normal",
                  }}
                >
                  Join Class
                </Typography>
              </Button>
            </Link>
          </Paper>
        ) : (
          <Paper></Paper>
        )}
      </Box>
    </Box>
  );
}
