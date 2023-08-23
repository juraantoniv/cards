import * as child_process from "child_process";

import { baseApi } from "./base-api";
import { FormValues } from "./src/components/ui/auth/login-form/login-from.tsx";
import { meType } from "./src/components/ui/layout/MainLayout.tsx";
import { FormValuesReg } from "./src/userRegisterForm.tsx";
import { decksResponse, userRegisterType } from "./types.ts";

type getDecksArgs = {
  minCardsCount?: string;
  maxCardsCount?: string;
  name?: string;
  authorId?: string;
  orderBy?: string;
  currentPage?: string;
  itemsPerPage?: string;
};
type Items = {
  id: string;
  deckId: string;
  userId: string;
  question: string;
  answer: string;
  shots: number;
  answerImg: string;
  questionImg: string;
  questionVideo: string;
  answerVideo: string;
  grade: number;
  created: string;
  updated: string;
};

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
};

export type carsdType = {
  items: Items[];
  pagination: Pagination;
};

type cardTypeArgs = {
  id: string;
  name: string;
};

const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDecks: builder.query<decksResponse, getDecksArgs | void>({
        query: (arg) => {
          return {
            url: `/v1/decks`,
            method: "GET",
            params: arg,
          };
        },
        providesTags: ["Decks"],
      }),
      getCards: builder.query<carsdType, { id: string | undefined }>({
        query: (id) => {
          return {
            url: `/v1/decks/${id.id}/cards`,
            method: "GET",
          };
        },
        providesTags: ["Cards"],
      }),
      getCardsById: builder.query<decksResponse, string>({
        query: (id) => {
          return {
            url: `/v1/decks/`,
            method: "GET",
            body: { authorId: id },
          };
        },
      }),
      me: builder.query<meType, void>({
        query: () => {
          return {
            url: `/v1/auth/me`,
            method: "GET",
          };
        },
        providesTags: ["Decks"],
      }),
      createDeck: builder.mutation<any, { name: string; isPrivate: boolean }>({
        query: (arg) => {
          return {
            url: `v1/decks`,
            method: "POST",
            body: arg,
          };
        },
        invalidatesTags: ["Decks"],
      }),
      editDeck: builder.mutation<any, { name: string; id: string }>({
        query: (arg) => {
          return {
            url: `v1/decks/${arg.id}`,
            method: "PATCH",
            body: { name: arg.name },
          };
        },
        invalidatesTags: ["Decks"],
      }),
      createCard: builder.mutation<any, cardTypeArgs>({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}/cards`,
            method: "POST",
            body: { question: arg.name, answer: "ygygyg" },
          };
        },
        invalidatesTags: ["Cards"],
      }),
      deleteDeck: builder.mutation<void, string>({
        query: (id) => {
          return {
            url: `/v1/decks/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Decks"],
      }),
      deleteCard: builder.mutation<void, string>({
        query: (id) => {
          return {
            url: `/v1/cards/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Cards"],
      }),
      logIn: builder.mutation<any, FormValues>({
        query: (body) => {
          return {
            url: `/v1/auth/login`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Decks"],
      }),
      logOut: builder.mutation<any, void>({
        query: () => {
          return {
            url: `/v1/auth/logout`,
            method: "POST",
          };
        },
      }),
      createUser: builder.mutation<any, FormValuesReg>({
        query: (user) => {
          return {
            url: `/v1/auth/sign-up`,
            method: "POST",
            body: { ...user, sendConfirmationEmail: false },
          };
        },
      }),
    };
  },
});

export const {
  useGetDecksQuery,
  useLazyGetDecksQuery,
  useCreateDeckMutation,
  useCreateUserMutation,
  useLogInMutation,
  useLogOutMutation,
  useDeleteDeckMutation,
  useMeQuery,
  useGetCardsQuery,
  useCreateCardMutation,
  useGetCardsByIdQuery,
  useEditDeckMutation,
  useDeleteCardMutation,
} = extendedApi;
