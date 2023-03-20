import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  Stack,
  Pagination,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";
import { ReactComponent as DotsIcon } from "../assets/svg/three-dots.svg";
import { ReactComponent as DeleteIcon } from "../assets/svg/delete.svg";
import { ReactComponent as EditIcon } from "../assets/svg/edit-1.svg";

import TeacherDashboardDrawer from "./components/TeacherDashboardDrawer";
import TeacherNavBar from "./components/TeacherNavBar";

import CreateClass from "./components/CreateClass";
import EditClass from "./components/EditClass";
import DeleteClassModal from "./components/DeleteClassModal";

import "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
export default function TeacherClass() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const [modal, SetModal] = useState({
    isOpen: false,
    isOpenEdit: false,
    isOpenDelete: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [delete_class, SetDelete] = useState("");
  const [classId, SetClassId] = useState("");
  const [class_data, SetClassData] = useState({});
  const [classes, SetClasses] = useState([]);
  const [search, SetSearch] = useState({
    isSearch: "",
  });

  const [result, SetResult] = useState({});

  const [page, SetPage] = useState(1);
  const [postperpage, SetPostperPage] = useState(4);

  const indexofLastPage = page * postperpage;
  const indexofFirstPage = indexofLastPage - postperpage;

  const handleChangePage = (e, newPage) => {
    SetPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    SetPostperPage(parseInt(+e.target.value));
    SetPage(1);
  };
  var class_arr = [];
  useEffect(() => {
    const SetData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = collection(db, "Classes");
          const q = query(userRef, where("userUid", "==", user.uid));
          const unsubscribe = onSnapshot(q, (querySnapShot) => {
            querySnapShot.forEach((docs) => {
              class_arr.push(docs.data());
              SetClasses(class_arr);
              SetResult(class_arr);
            });
          });
        }
      });
    };
    SetData();
  }, [result]);

  const handleChangeSearch = (prop) => (e) => {
    SetSearch({ ...search, [prop]: e.target.value });
  };

  const handleChangeModalOpen = () => {
    SetModal({ ...modal, isOpen: true });
  };

  const handleChangeModalClose = () => {
    SetModal({ ...modal, isOpen: false });
  };

  const handleChangeClassModalOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleChangeClassModalClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleChangeEditModalOpen = (e) => {
    e.stopPropagation();
    SetModal({ ...modal, isOpenEdit: true });
  };
  const handleChangeEditModalClose = (e) => {
    SetModal({ ...modal, isOpenEdit: false });
  };

  const handleChangeDeleteModalOpen = (e) => {
    e.stopPropagation();
    SetModal({ ...modal, isOpenDelete: true });
  };
  const handleChangeDeleteModalClose = (e) => {
    SetModal({ ...modal, isOpenDelete: false });
  };

  const GetclassId = (classId) => {
    SetClassId(classId);
  };

  const GetClassData = (class_data) => {
    SetClassData(class_data);
  };

  const GetClass = (classId) => {
    window.localStorage.setItem("code", classId);
    window.localStorage.setItem("url", "/teacherclasses/class=?" + classId);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.secondary.bg9,
        display: "flex",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: {
            lg: "block",
            md: "none",
            sm: "none",
            xs: "none",
          },
          height: "100vh",
          width: "200px",

          backgroundColor: "red",
          zIndex: 10000,
        }}
      >
        <TeacherDashboardDrawer />
      </Box>
      <Box
        sx={{
          postion: "relative",
          display: "flex",
          flexDirection: "column",
          width: {
            lg: "90%",
            md: "100%",
            sm: "100%",
            xs: "100%",
          },
        }}
      >
        <TeacherNavBar />
        <Box
          sx={{
            height: "100%",
            padding: {
              lg: "20px 40px",
              md: "20px 40px",
              sm: "20px 40px",
              xs: "20px 20px",
            },
            backgroundColor: (theme) => theme.palette.secondary.bg9,
          }}
        >
          <Typography
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "block",
                xs: "none",
              },
              fontFamily: (theme) => theme.palette.typography.fontFamily,
              fontWeight: "600",
              fontSize: "24px",
              color: (theme) => theme.palette.textColor.col1,
              mb: "20px",
            }}
          >
            My Classes
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
              alignItems: "center",
            }}
          >
            <TextField
              onChange={handleChangeSearch("isSearch")}
              value={search.isSearch}
              size="small"
              placeholder="Search for a class"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "#2499E3",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: (theme) => theme.palette.secondary.bg9,
                borderRadius: "10px",
                mb: "20px",
                width: {
                  lg: "200px",
                  md: "200xp",
                  sm: "200px",
                  xs: "100%",
                },
                "& label.Mui-focused": {
                  borderColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "10px",
                },
                "& .MuiInput-underline:after": {
                  borderColor: (theme) => theme.palette.secondary.main,
                  borderRadius: "10px",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) => theme.palette.secondary.main,
                    borderRadius: "10px",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: (theme) => theme.palette.secondary.main,
                    borderRadius: "10px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: (theme) => theme.palette.secondary.main,
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
            <Box component="span" sx={{ flexGrow: "1" }} />
            <Button
              onClick={handleChangeModalOpen}
              sx={{
                height: "40px",
                width: { lg: "150px", md: "150px", sm: "150px", xs: "100%" },
                backgroundColor: (theme) => theme.palette.secondary.main,
                boxShadow: "0px 6px 0px #26399C",
                borderRadius: "10px",
                transition: "0.3s ease",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: (theme) => theme.palette.secondary.bg7,
                  transform: "translateY(10%)",
                },
                mb: "20px",
              }}
              startIcon={
                <PlusIcon
                  style={{
                    height: "20px",
                    width: "20px",
                    color: "#FFFFFF",
                    marginLeft: "5px",
                  }}
                />
              }
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "normal",
                  color: (theme) => theme.palette.textColor.col2,
                  textTransform: "capitalize",
                }}
              >
                Create Class
              </Typography>
            </Button>
          </Box>
          {classes.length !== 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                backgroundColor: (theme) => theme.palette.secondary.bg9,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    height: "350px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    padding: "20px",
                    width: "100%",
                    overflow: "auto",
                    backgroundColor: (theme) => theme.palette.secondary.bg9,
                  }}
                >
                  {classes
                    .filter((index) =>
                      search.isSearch !== ""
                        ? index.Classname.includes(
                            search.isSearch.toLocaleLowerCase()
                          ) ||
                          index.Classname.includes(
                            search.isSearch.toLocaleUpperCase()
                          ) ||
                          index.Section.includes(
                            search.isSearch.toLocaleLowerCase()
                          ) ||
                          index.Section.includes(
                            search.isSearch.toLocaleUpperCase()
                          )
                        : index
                    )
                    .slice(indexofFirstPage, indexofLastPage)
                    .map((row, index) => (
                      <Paper
                        key={index}
                        onClick={() => {
                          GetClass(row.classId);
                          navigate("/teacherclasses/class=?" + row.classId);
                        }}
                        id="parent"
                        sx={{
                          position: "relative",
                          display: "flex",
                          height: "150px",
                          width: {
                            lg: "45%",
                            md: "45%",
                            sm: "45%",
                            xs: "100%",
                          },
                          borderRadius: "10px",
                          mb: "20px",
                        }}
                      >
                        <Box
                          component="div"
                          sx={{
                            height: "100%",
                            width: "6%",
                            backgroundColor: row.Class_Color_Code,
                            borderRadius: "10px 0px 0px 10px",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            width: "70%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: (theme) =>
                                theme.palette.typography.fontFamily,
                              fontWeight: "normal",
                              color: row.Class_Color_Code,
                              textTransform: "capitalize",
                              margin: "20px 0px 0px 20px",
                            }}
                          >
                            {row.Classname}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: (theme) =>
                                theme.palette.typography.fontFamily,
                              fontWeight: "normal",
                              color: row.Class_Color_Code,
                              textTransform: "capitalize",
                              margin: "0px 0px 0px 20px",
                            }}
                          >
                            {row.Section}
                          </Typography>
                          <Box component="span" sx={{ flexGrow: "1" }} />
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: (theme) =>
                                theme.palette.typography.fontFamily,
                              fontWeight: "normal",
                              color: row.Class_Color_Code,
                              textTransform: "capitalize",
                              margin: "0px 0px 10px 20px",
                            }}
                          >
                            0 Students
                          </Typography>
                        </Box>
                        <Box
                          id="child_1"
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            height: "100%",
                            width: "25%",
                            borderRadius: "10px 0px 0px 10px",
                          }}
                        >
                          <IconButton
                            id="child_2"
                            sx={{ mt: "10px", mr: "10px" }}
                            onClick={(e) => (
                              handleChangeClassModalOpen(e),
                              GetclassId(row.classId)
                            )}
                          >
                            <DotsIcon
                              style={{ height: "20px", width: "20px" }}
                            />
                          </IconButton>
                        </Box>
                        {row.classId === classId ? (
                          <Menu
                            open={modal.isOpenEdit ? false : open}
                            anchorEl={anchorEl}
                            onClose={handleChangeClassModalClose}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <Paper
                              sx={{
                                width: "200px",
                                boxShadow: "none",
                              }}
                            >
                              <Button
                                onClick={(e) => {
                                  handleChangeEditModalOpen(e);
                                  GetClassData(row);
                                }}
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  width: "100%",
                                }}
                                startIcon={
                                  <EditIcon
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                      color: "#2499E3",
                                      marginLeft: "10px",
                                    }}
                                  />
                                }
                              >
                                <Typography
                                  sx={{
                                    fontFamily: (theme) =>
                                      theme.palette.typography.fontFamily,
                                    fontWeight: "normal",
                                    color: (theme) =>
                                      theme.palette.textColor.col1,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Edit class details
                                </Typography>
                              </Button>
                              <Button
                                onClick={(e) => {
                                  handleChangeDeleteModalOpen(e);
                                }}
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  width: "100%",
                                }}
                                startIcon={
                                  <DeleteIcon
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                      color: "#2499E3",
                                      marginLeft: "10px",
                                    }}
                                  />
                                }
                              >
                                <Typography
                                  sx={{
                                    fontFamily: (theme) =>
                                      theme.palette.typography.fontFamily,
                                    fontWeight: "normal",
                                    color: (theme) =>
                                      theme.palette.textColor.col1,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Delete Class
                                </Typography>
                              </Button>
                            </Paper>
                          </Menu>
                        ) : (
                          ""
                        )}
                      </Paper>
                    ))}
                </Box>
              </Box>
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                <Pagination
                  count={Math.ceil(classes.length / postperpage)}
                  page={page}
                  siblingCount={2}
                  boundaryCount={2}
                  variant="outlined"
                  onChange={handleChangePage}
                />
              </Stack>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "500px",
                width: "100%",
                backgroundColor: (theme) => theme.palette.common.white,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: (theme) => theme.palette.typography.fontFamily,
                  fontWeight: "600",
                  color: (theme) => theme.palette.textColor.col1,
                  boxShadow: "none",
                  mb: "40px",
                }}
              >
                Welcome to Classes on Quiz Bee
              </Typography>
              <Paper
                sx={{
                  height: "150px",
                  width: "45%",
                  backgroundColor: (theme) => theme.palette.secondary.bg9,
                  borderRadius: "100px 20px 20px 100px",
                  boxShadow: "none",
                  mb: "40px",
                }}
              ></Paper>
              <Paper
                sx={{
                  height: "150px",
                  width: "45%",
                  backgroundColor: (theme) => theme.palette.secondary.bg9,
                  borderRadius: "20px 100px 100px 20px",
                  boxShadow: "none",
                }}
              ></Paper>
            </Box>
          )}
        </Box>
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
              color: (theme) => theme.palette.textColor.col4,
            }}
          >
            Copyright © 2023 All Right Reserved
          </Typography>
        </Box>
      </Box>
      <CreateClass Open={modal.isOpen} onClose={handleChangeModalClose} />
      <EditClass
        Open={modal.isOpenEdit}
        onClose={handleChangeEditModalClose}
        classname={class_data.Classname}
        subject={class_data.Subject}
        section={class_data.Section}
        color_code={class_data.Class_Color_Code}
        classId={class_data.classId}
      />
      <DeleteClassModal
        open={modal.isOpenDelete}
        onClose={handleChangeDeleteModalClose}
        classId={classId}
      />
    </Box>
  );
}
