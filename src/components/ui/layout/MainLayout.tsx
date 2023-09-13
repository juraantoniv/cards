import React, { useState } from "react";

import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { useMeQuery } from "../../../services/decs-query.ts";
import { decksSlice } from "../../../services/slices.ts";
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
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isLoading } = useMeQuery();

  const logIN = () => {
    navigate("/login");
  };

  const onClickHandler = () => {
    navigate("/decks");
    dispatch(decksSlice.actions.setAuthorId(""));
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
              img={data?.avatar}
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
