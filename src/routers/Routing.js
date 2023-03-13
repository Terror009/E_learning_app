import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

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

import UserRoleVer from "../pages/UserRoleVer";
import StudentRoles from "../pages/components/userrole_ver/education/StudentRoles";
import TeacherRoles from "../pages/components/userrole_ver/education/TeacherRoles";

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
    status: null,
    redirected: "",
  });
  const [payload, setPayload] = useState("");
  const [data, Setdata] = useState({
    isAuth: false,
    isLoading: true,
  });
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
            setPayload();

            const indexof = user.email.indexOf("@");
            Setdata({
              ...data,
              isAuth: false,
              isLoading: true,
            });
            updateProfile(user, {
              displayName: user.email.substring(0, indexof),
            });
          }
        } else {
          console.log("null");
          Setdata({ ...data, isAuth: false, isLoading: false });
        }
      });
    };
    SetData();
  }, []);

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
            <Route
              path="/activity"
              element={<PrivateRouter Component={Activity} isAuth={payload} />}
            />
            <Route
              path="/classes"
              element={<PrivateRouter Component={Classes} isAuth={payload} />}
            />
            <Route
              path="/setting"
              element={<PrivateRouter Component={Setting} isAuth={payload} />}
            />
            <Route
              path="/userrole_ver/student"
              element={
                <PrivateRouter Component={StudentRoles} isAuth={payload} />
              }
            />
            <Route
              path="/userrole_ver/teacher"
              element={
                <PrivateRouter Component={TeacherRoles} isAuth={payload} />
              }
            />
            <Route
              path="/userrole_ver"
              element={
                <PrivateRouter Component={UserRoleVer} isAuth={payload} />
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
}
