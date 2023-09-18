import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { decksResponse } from "../../types.ts";

const initialState = {
  itemsPerPage: 10,
  currentPage: 1,
  searchByName: "",
  orderBy: "created-desc",
  isLoading: true,
  cardsCount: [0, 20],
  decks: {} as decksResponse,
  authorId: "",
  name: "",
  showDeleteForm: false,
  editMode: false,
  id: "",
  previousCard: "",
  deckId: "",
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
    setDeckId: (state, action: PayloadAction<string>) => {
      state.deckId = action.payload;
    },
    loadDecks: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    setPrevious: (state, action: PayloadAction<string>) => {
      state.previousCard = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCardCount: (state, action: PayloadAction<number[]>) => {
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
  },
});
