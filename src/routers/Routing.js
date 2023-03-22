import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, Box } from "@mui/material";

import { theme } from "../utils/theme";

import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

import Main from "../pages/Main";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/Dashboard";
import Activity from "../pages/Activity";
import Classes from "../pages/Classes";
import Setting from "../pages/Setting";
import Loading from "../pages/Loading";
import StudentDashboard from "../pages/DashboardRole/StudentDashboard";
import TeacherClass from "../pages/TeacherClass";
import TeacherReport from "../pages/TeacherReport";
import ClassRoom from "../pages/ClassRoom";
import TeacherSetting from "../pages/TeacherSetting";

import UserRoleVer from "../pages/UserRoleVer";
import StudentRoles from "../pages/components/userrole_ver/education/StudentRoles";
import TeacherRoles from "../pages/components/userrole_ver/education/TeacherRoles";

import JoinClass from "../pages/JoinClass";

import MessageDialog from "../pages/components/MessageDialog";

import "../utils/firebase";
import { getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { Redirected } from "../utils/userUrl";

export default function Routing() {
  const Theme = createTheme(theme(true));
  const auth = getAuth();
  const db = getFirestore();
  const redirected = localStorage;
  const [userData, SetUserData] = useState({
    role: "",
    status: false,
    redirected: "",
  });
  const [payload, setPayload] = useState("");
  const [dialog, SetDialog] = useState({
    message: "",
    isOpen: false,
    icon: false,
  });
  const [data, Setdata] = useState({
    isAuth: false,
    isLoading: true,
  });
  const [link, SetLink] = useState("");
  useEffect(() => {
    const SetData = () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          if (user.emailVerified) {
            setPayload(user);

            Setdata({
              ...data,
              isAuth: true,
              isLoading: false,
            });
          } else {
            setPayload("");
            if (window.location.pathname.includes("/register")) {
              SetDialog({
                ...dialog,
                message: "Email verification sent please check gmail",
                isOpen: true,
                icon: true,
              });
            } else if (window.location.pathname.includes("/login")) {
              SetDialog({
                ...dialog,
                message: "Email is not verified",
                isOpen: true,
                icon: false,
              });
              auth.signOut();
            }
            const indexof = user.email.indexOf("@");
            Setdata({
              ...data,
              isAuth: false,
              isLoading: true,
            });
            updateProfile(user, {
              displayName: user.email.substring(0, indexof),
            });
            const timer = setTimeout(() => {
              window.location.replace("/login");
            }, 3000);
            return () => clearTimeout(timer);
          }
        } else {
          console.log("null");
          Setdata({ ...data, isAuth: false, isLoading: false });
        }
      });
    };
    SetData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const userRef = collection(db, "Users");
          const q = query(userRef, where("userUid", "==", user.uid));
          const unsubscribe = onSnapshot(q, (querySnapShot) => {
            querySnapShot.forEach((docs) => {
              if (docs.exists) {
                SetUserData({
                  ...userData,
                  role: docs.data().userRole,
                  status: docs.data().Status,
                });
              }
            });
          });
        }
      });
    };
    getData();
  }, []);

  useEffect(() => {
    const getLink = () => {
      SetLink(window.localStorage.getItem("code"));
    };
    getLink();
  }, [link]);
  const handleChangeDialogClose = () => {
    SetDialog({ ...dialog, isOpen: true });
  };
  if (!data.isAuth && data.isLoading) {
    return (
      <ThemeProvider theme={Theme}>
        <Loading />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={Theme}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<PublicRouter Component={Main} isAuth={payload} />}
            />
            <Route
              path="/login"
              element={<PublicRouter Component={UserLogin} isAuth={payload} />}
            />
            <Route
              path="/register"
              element={
                <PublicRouter Component={UserRegister} isAuth={payload} />
              }
            />
            <Route
              path="/dashboard"
              element={<PrivateRouter Component={Dashboard} isAuth={payload} />}
            />
            {userData.role === "Student" && userData.status ? (
              <React.Fragment>
                <Route
                  path="/activity"
                  element={
                    <PrivateRouter Component={Activity} isAuth={payload} />
                  }
                />
                <Route
                  path="/classes"
                  element={
                    <PrivateRouter Component={Classes} isAuth={payload} />
                  }
                />
              </React.Fragment>
            ) : userData.role === "Teacher" && userData.status ? (
              <React.Fragment>
                <Route
                  path="/teacherclasses"
                  element={
                    <PrivateRouter Component={TeacherClass} isAuth={payload} />
                  }
                />
                <Route
                  path="/teacherreport"
                  element={
                    <PrivateRouter Component={TeacherReport} isAuth={payload} />
                  }
                />
                <Route
                  path="/teacherclasses/class=?"
                  element={
                    <PrivateRouter Component={ClassRoom} isAuth={payload} />
                  }
                />
                <Route
                  path="/teachersettings"
                  element={
                    <PrivateRouter
                      Component={TeacherSetting}
                      isAuth={payload}
                    />
                  }
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route
                  path="/activity"
                  element={
                    <PrivateRouter Component={Activity} isAuth={payload} />
                  }
                />
                <Route
                  path="/classes"
                  element={
                    <PrivateRouter Component={Classes} isAuth={payload} />
                  }
                />
              </React.Fragment>
            )}
            <Route
              path="/setting"
              element={<PrivateRouter Component={Setting} isAuth={payload} />}
            />
            {userData.role === "Student" && userData.status === false ? (
              <Route
                path="/userrole_ver/student"
                element={
                  <PrivateRouter Component={StudentRoles} isAuth={payload} />
                }
              />
            ) : userData.role === "Teacher" && userData.status === false ? (
              <Route
                path="/userrole_ver/teacher"
                element={
                  <PrivateRouter Component={TeacherRoles} isAuth={payload} />
                }
              />
            ) : userData.role === undefined ||
              (userData.role === "" && userData.status === false) ? (
              <Route
                path="/userrole_ver"
                element={
                  <PrivateRouter Component={UserRoleVer} isAuth={payload} />
                }
              />
            ) : (
              <Route path="*" element={<PageNotFound />} />
            )}

            <Route path="/classes/join_class=?" element={<JoinClass />} />
            {userData ? "" : <Route path="*" element={<PageNotFound />} />}
          </Routes>
        </Router>
        <Box>
          <MessageDialog
            Open={dialog.isOpen}
            onClose={handleChangeDialogClose}
            message={dialog.message}
            icon={dialog.icon}
          />
        </Box>
      </ThemeProvider>
    );
  }
}
