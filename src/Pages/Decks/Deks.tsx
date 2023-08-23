import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useLogOutMutation,
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
import { TableDecks } from "../../components/ui/tableDecks";
import { TabPanel } from "../../components/ui/tabPanel";
import { TextField } from "../../components/ui/textField/textField.tsx";
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

  const orderBy: decksResponse = useAppSelector(
    (state) => state.decksSlice.orderBy,
  );

  const decks = useAppSelector((state) => state.decksSlice.decks);

  const sort = (sort: string) => {
    dispatch(decksSlice.actions.setSort(sort));
  };

  const [name, setName] = useState("");
  const [createDeckFlag, setCreateDeckFlag] = useState(false);

  const itemsPerPage: number = useAppSelector(
    (state) => state.decksSlice.itemsPerPage,
  );
  const { data } = useGetDecksQuery({
    currentPage: `${page}`,
    itemsPerPage: `${itemsPerPage}`,
    orderBy: `${orderBy}`,
    authorId: `${authorId}`,
    name: `${name}`,
  });

  const [createDeck, {}] = useCreateDeckMutation();

  const [logOut, {}] = useLogOutMutation();
  const [delDeck, {}] = useDeleteDeckMutation();
  const navigate = useNavigate();

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
    dispatch(decksSlice.actions.setLogIn(false));
  };

  const deleteDeck = (id: string) => {
    toast.info("Pending");
    delDeck(id)
      .unwrap()
      .then(() => {
        toast.success("Deleted");
      });
  };

  return (
    <div style={{ paddingTop: 200 }}>
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
        <TextField
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
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

      <table>
        {
          <TableDecks
            sendDataToServer={sort}
            dataContentTable={data?.items}
            deleteItem={deleteDeck}
            dataHeadersTable={headerDecksItems}
          />
        }
      </table>
    </div>
  );
};

export default Deks;
