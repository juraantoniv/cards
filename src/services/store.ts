import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import { decksResponse } from "../../types.ts";

const initialState = {
  itemsPerPage: 10,
  currentPage: 1,
  searchByName: "",
  orderBy: "created-desc",
  setLogIn: false,
  cardsCount: [0, 20],
  decks: {} as decksResponse,
  authorId: "",
  name: "",
  showDeleteForm: false,
  editMode: false,
};

export const decksSlice = createSlice({
  initialState,
  name: "decksSlice",
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload;
    },
    setLogIn: (state, action: PayloadAction<boolean>) => {
      state.setLogIn = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    setCardCount: (state, action: PayloadAction<Array>) => {
      state.cardsCount = action.payload;
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload;
    },
    getName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    showDeleteForm: (state, action: PayloadAction<boolean>) => {
      state.showDeleteForm = action.payload;
    },
    editMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    getDecks: (
      state,
      action: PayloadAction<{ items: decksResponse; id: string }>,
    ) => {
      state.decks.items = action.payload.items.items.filter(
        (el) => el.author.name === action.payload.id,
      );
    },
  },
});
