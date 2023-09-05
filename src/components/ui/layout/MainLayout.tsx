import React, { useState } from "react";

import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useLogInMutation, useMeQuery } from "../../../../decs-query";
import { DropdownMenuComponent } from "../drop-down-menu";
import { Header } from "../header";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export type meType = {
  avatar: string;
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  created: string;
  updated: string;
};
const MainLayout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { data, isLoading } = useMeQuery();

  const logIN = () => {
    navigate("/login");
  };

  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div style={style}>
          <Header
            name={data?.name}
            logIn={!!data}
            callback={logIN}
            navigate={onClickHandler}
          >
            <DropdownMenuComponent
              data={data}
              arrItems={["My Profile", "Sign Out"]}
            />
          </Header>

          {/*{!data ? <Login /> : <Outlet />}*/}
          {/*{location.pathname.endsWith("/register") ? (*/}
          {/*  <div style={{ position: "absolute", left: "39%" }}>*/}
          {/*    <Outlet />*/}
          {/*  </div>*/}
          {/*) : null}*/}

          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
