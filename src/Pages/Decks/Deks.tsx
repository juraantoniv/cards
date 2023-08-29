import React, { useEffect, useState } from "react";

import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useLogOutMutation,
  useMeQuery,
} from "../../../decs-query.ts";
import { useAppDispatch, useAppSelector } from "../../../store.ts";
import { decksResponse } from "../../../types.ts";
import { Button } from "../../components/ui/button";
import {
  CreateDecksForm,
  createDecksForm,
  DecksForm,
} from "../../components/ui/createDecks";
import { DropdownMenuComponent } from "../../components/ui/drop-down-menu";
import { Header } from "../../components/ui/header";
import { Login } from "../../components/ui/login";
import { NotFoundPage } from "../../components/ui/notFound/notFoundPage.tsx";
import { TableDecks } from "../../components/ui/tableDecks";
import { TabPanel } from "../../components/ui/tabPanel";
import { TextField } from "../../components/ui/textField/textField.tsx";
import { loadBoolean } from "../../services/localStoregeServices.ts";
import { decksSlice } from "../../services/store.ts";
import SliderPage from "../sliderPage.tsx";
import TabPage from "../TabPanelPage/tabPage.tsx";

import s from "./Deks.module.scss";

const headerDecksItems = [
  { key: "name", title: "Name" },
  { key: "cardsCount", title: "Cards" },
  { key: "updated", title: "Last Updated" },
  { key: "created", title: "Created By" },
];

const Deks = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.decksSlice.currentPage);
  const authorId = useAppSelector((state) => state.decksSlice.authorId);
  const load = useAppSelector((state) => state.decksSlice.isLoading);

  const { data: LogOutData } = useMeQuery();

  const orderBy: decksResponse = useAppSelector(
    (state) => state.decksSlice.orderBy,
  );

  const countCards = useAppSelector((state) => state.decksSlice.cardsCount);

  const sort = (sort: string) => {
    dispatch(decksSlice.actions.setSort(sort));
  };

  const [name, setName] = useState("");
  const [createDeckFlag, setCreateDeckFlag] = useState(false);

  const itemsPerPage: number = useAppSelector(
    (state) => state.decksSlice.itemsPerPage,
  );
  const { data, isLoading } = useGetDecksQuery({
    currentPage: `${page}`,
    itemsPerPage: `${itemsPerPage}`,
    orderBy: `${orderBy}`,
    authorId: `${authorId}`,
    name: `${name}`,
    minCardsCount: `${countCards[0]}`,
    maxCardsCount: `${countCards[1]}`,
  });

  const [logOut, {}] = useLogOutMutation();
  const [delDeck, {}] = useDeleteDeckMutation();

  function onChangeHandler() {
    setCreateDeckFlag(true);
  }
  const onChangeHandlerClose = () => {
    setCreateDeckFlag(false);
  };

  // const [initializeQuery, { isLoading, data }] = useLazyGetDecksQuery();

  // function onChangeHandler() {
  //   createDeck(name);
  // }

  const logOUT = () => {
    logOut();
  };

  const deleteDeck = (id: string) => {
    toast.info("Pending");
    delDeck(id)
      .unwrap()
      .then(() => {
        toast.success("Deleted");
      });
  };

  if (!LogOutData) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={s.box}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className={s.headerDeck}>
        <div className={s.small_box}>
          <TextField
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <TabPage />
        <div className={s.s}>
          {createDeckFlag && (
            <DecksForm
              forEditFlag={false}
              callback={onChangeHandlerClose}
              headerName={"Add new pack"}
            />
          )}
        </div>

        <SliderPage />
        <Button onClick={onChangeHandler}>Create a deck</Button>
      </div>

      {isLoading ? (
        <LinearProgress />
      ) : (
        <table>
          <TableDecks
            sendDataToServer={sort}
            dataContentTable={data?.items}
            deleteItem={deleteDeck}
            dataHeadersTable={headerDecksItems}
            totalItems={data?.pagination.totalItems}
          />
        </table>
      )}
    </div>
  );
};

export default Deks;
