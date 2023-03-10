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
import LoginUseEmail from "../pages/components/LoginUseEmail";
import RegisterUseEmail from "../pages/components/RegisterUseEmail";
import Activity from "../pages/Activity";
import Classes from "../pages/Classes";
import Loading from "../pages/Loading";

import UserRoleVer from "../pages/UserRoleVer";
import StudentRoles from "../pages/components/userrole_ver/education/StudentRoles";
import TeacherRoles from "../pages/components/userrole_ver/education/TeacherRoles";

import "../utils/firebase";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

import { Redirected, Status, UserType } from "../utils/userUrl";
export default function Routing() {
  const Theme = createTheme(theme(true));
  const auth = getAuth();

  const [payload, setPayload] = useState("");
  const [data, Setdata] = useState({
    isAuth: false,
    isLoading: true,
  });
  const redirected = localStorage;
  const status = localStorage;
  const usertype = localStorage;
  useEffect(() => {
    const SetData = () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setPayload(user);
          Setdata({
            ...data,
            isAuth: true,
            isLoading: false,
          });
          const db = getFirestore();
          const userRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userRef);
          if (!userDoc.exists) {
            console.log("false");
          } else {
            if (userDoc.data().Status) {
              Redirected("url", "/dashboard");
              Status("status", true);

              redirected.getItem("url");
              status.getItem("status");
            } else if (userDoc.data().userRole === "Student") {
              Redirected("url", "/userrole_ver/student");
              UserType("type", userDoc.data().userRole);
              Status("status", false);
              status.getItem("status");
              redirected.getItem("url");
              usertype.getItem("type");
            } else if (userDoc.data().userRole === "Teacher") {
              Redirected("url", "/userrole_ver/teacher");
              UserType("type", userDoc.data().userRole);
              Status("status", false);
              status.getItem("status");
              redirected.getItem("url");
              usertype.getItem("type");
            } else {
              Redirected("url", "/userrole_ver");
              UserType("type", userDoc.data().userRole);
              Status("status", false);

              status.getItem("status");
              redirected.getItem("url");
              usertype.getItem("type");
            }
          }

          /*    try {
            const indexof = user.email.indexOf("@");
            const db = getFirestore();
            const userRef = collection(db, "Users");
            const q = query(userRef);
            
            onSnapshot(q, (querySnapShot) => {
              querySnapShot.forEach((doc) => {
                if (!doc.exists) {
                  const usersDoc = doc(db, "users", user.uid);
                  setDoc(usersDoc, {
                    email: user.email,
                    username: user.displayName.substring(0, indexof),
                    userUId: user.uid,
                  });
                } else {
                  console.log("okay");
                }
              });
            });
          } catch (err) {
            console.log(err);
          } */
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
              element={
                <PublicRouter
                  Component={Main}
                  isAuth={payload}
                  redirected={redirected.url}
                />
              }
            />
            <Route
              path="/login"
              element={
                <PublicRouter
                  Component={UserLogin}
                  isAuth={payload}
                  redirected={redirected.url}
                />
              }
            />
            <Route
              path="/register"
              element={
                <PublicRouter
                  Component={UserRegister}
                  isAuth={payload}
                  redirected={redirected.url}
                />
              }
            />
            <Route
              path="/login/login_use_email"
              element={
                <PublicRouter
                  Component={LoginUseEmail}
                  isAuth={payload}
                  redirected={redirected.url}
                />
              }
            />
            <Route
              path="/register/register_use_email"
              element={
                <PublicRouter
                  Component={RegisterUseEmail}
                  isAuth={payload}
                  redirected={redirected.url}
                />
              }
            />
            {status.status === true ? (
              <React.Fragment>
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRouter Component={Dashboard} isAuth={payload} />
                  }
                />
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
            ) : (
              <React.Fragment>
                {usertype.type === "Student" ? (
                  <Route
                    path="/userrole_ver/student"
                    element={
                      <PrivateRouter
                        Component={StudentRoles}
                        isAuth={payload}
                      />
                    }
                  />
                ) : usertype.type === "Teacher" ? (
                  <Route
                    path="/userrole_ver/teacher"
                    element={
                      <PrivateRouter
                        Component={TeacherRoles}
                        isAuth={payload}
                      />
                    }
                  />
                ) : (
                  <Route
                    path="/userrole_ver"
                    element={
                      <PrivateRouter Component={UserRoleVer} isAuth={payload} />
                    }
                  />
                )}
              </React.Fragment>
            )}

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
}
