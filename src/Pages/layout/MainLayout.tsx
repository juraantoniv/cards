import { useCallback } from "react";

import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { DropdownMenuComponent } from "../../components/ui/drop-down-menu";
import { Header } from "../../components/ui/header";
import { useMeQuery } from "../../services/decs-query.ts";
import { decksSlice } from "../../services/slices.ts";

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

  const logIN = useCallback(() => {
    navigate("/login");
  }, []);

  const onClickHandler = () => {
    navigate("");
    dispatch(decksSlice.actions.setAuthorId(""));
  };

  return (
    <div>
      {isLoading ? <LinearProgress style={{ zIndex: "100" }} /> : null}
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

        {/*{data === null ? <Login /> : <Outlet />}*/}
        {/*{location.pathname.endsWith("/register") ? (*/}
        {/*  <div style={{ position: "absolute", left: "39%" }}>*/}
        {/*    <Outlet />*/}
        {/*  </div>*/}
        {/*) : null}*/}

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
