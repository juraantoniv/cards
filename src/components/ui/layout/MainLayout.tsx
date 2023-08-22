import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useMeQuery } from "../../../../decs-query";
import { useAppSelector } from "../../../../store.ts";
import { DropdownMenuComponent } from "../drop-down-menu";
import { Header } from "../header";

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
  const navigate = useNavigate();

  const setLogIn = useAppSelector((state) => state.decksSlice.setLogIn);

  const { data } = useMeQuery();

  const logIN = () => {
    navigate("/login");
  };

  console.log(setLogIn);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header name={data?.name} logIn={setLogIn} callback={logIN}>
        <DropdownMenuComponent
          data={data}
          arrItems={["My Profile", "Sign Out"]}
        />
      </Header>

      <Outlet />
    </div>
  );
};

export default MainLayout;
