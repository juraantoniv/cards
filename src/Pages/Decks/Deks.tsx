import React, { useEffect, useState } from "react";

import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { navigate } from "@storybook/addon-links";
import { Simulate } from "react-dom/test-utils";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../../store.ts";
import { decksResponse } from "../../../types.ts";
import { Button } from "../../components/ui/button";
import { TableDecks } from "../../components/ui/tableDecks";
import { TextField } from "../../components/ui/textField/textField.tsx";
import {
  useDeleteDeckMutation,
  useGetDecksQuery,
  useMeQuery,
} from "../../services/decs-query.ts";
import { decksSlice } from "../../services/slices.ts";
import { CreateDeckPage } from "../CreateDeckPage/createDeckPage.tsx";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.decksSlice.currentPage);
  const authorId = useAppSelector((state) => state.decksSlice.authorId);
  const load = useAppSelector((state) => state.decksSlice.isLoading);

  const { data: LogOutData, error } = useMeQuery();

  const orderBy: decksResponse = useAppSelector(
    (state) => state.decksSlice.orderBy,
  );

  const countCards = useAppSelector((state) => state.decksSlice.cardsCount);

  const sort = (sort: string) => {
    dispatch(decksSlice.actions.setSort(sort));
  };

  const [name, setName] = useState("");
  const [createDeckFlag, setCreateDeckFlag] = useState(false);

  const itemsPerPage = useAppSelector((state) => state.decksSlice.itemsPerPage);
  const { data, isLoading } = useGetDecksQuery({
    currentPage: `${page}`,
    itemsPerPage: `${itemsPerPage}`,
    orderBy: `${orderBy}`,
    authorId: `${authorId}`,
    name: `${name}`,
    minCardsCount: `${countCards[0]}`,
    maxCardsCount: `${countCards[1]}`,
  });

  console.log(error);

  const [delDeck, {}] = useDeleteDeckMutation();

  function onChangeHandler() {
    setCreateDeckFlag(true);
  }
  const onChangeHandlerClose = () => {
    setCreateDeckFlag(false);
  };

  const deleteDeck = (id: string) => {
    toast.info("Pending");
    delDeck(id)
      .unwrap()
      .then(() => {
        toast.success("Deleted");
      })
      .catch((e) => {
        toast.error(`${e.data.message}`);
      });
  };

  useEffect(() => {
    if (LogOutData) return;

    navigate("/login");
  }, []);

  return (
    <div className={s.box}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
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
            <CreateDeckPage
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
