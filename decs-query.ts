import * as child_process from "child_process";

import { baseApi } from "./base-api";
import { FormValues } from "./src/components/ui/auth/login-form/login-from.tsx";
import { meType } from "./src/components/ui/layout/MainLayout.tsx";
import { decksSlice } from "./src/services/store.ts";
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
export type Author = {
  id: string;
  name: string;
};

export type userDecks = {
  author: Author;
  id: string;
  userId: string;
  name: string;
  isPrivate: boolean;
  shots: number;
  cover: string;
  rating: number;
  created: string;
  updated: string;
  cardsCount: number;
};
type cardTypeArgs = {
  id: string;
  answer: string;
  question: string;
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
      getDecksById: builder.query<userDecks, { id: string }>({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}`,
            method: "GET",
          };
        },
        providesTags: ["getName"],
      }),
      getCards: builder.query<
        carsdType,
        { question: string; id: string | undefined }
      >({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}/cards`,
            method: "GET",
          };
        },
        providesTags: ["Cards"],
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
      meEditNickname: builder.mutation<meType, string>({
        query: (arg) => {
          return {
            url: `/v1/auth/me`,
            method: "PATCH",
            body: { name: arg },
          };
        },
        invalidatesTags: ["Decks"],
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
        invalidatesTags: ["getName"],
      }),
      createCard: builder.mutation<any, cardTypeArgs>({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}/cards`,
            method: "POST",
            body: { question: arg.question, answer: arg.answer },
          };
        },
        invalidatesTags: ["Cards"],
      }),
      editCard: builder.mutation<any, cardTypeArgs>({
        query: (arg) => {
          return {
            url: `/v1/cards/${arg.id}`,
            method: "PATCH",
            body: { question: arg.question, answer: arg.answer },
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
        invalidatesTags: ["Decks", "Cards"],
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
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            baseApi.util.updateQueryData("me", undefined, () => {
              return null;
            }),
          );

          const patchResultDecks = dispatch(
            baseApi.util.updateQueryData("getDecks", undefined, () => {
              return null;
            }),
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
            patchResultDecks.undo();

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
      }),
      recoveryPassword: builder.mutation<any, string>({
        query: (email) => {
          return {
            url: `/v1/auth/recover-password`,
            method: "POST",
            body: {
              html: '<h1>Hi, ##name##</h1><p>Click <a href="##token##">here</a> to recover your password</p>',
              email: email,
              subject: "string",
            },
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
  useEditDeckMutation,
  useDeleteCardMutation,
  useEditCardMutation,
  useLazyGetCardsQuery,
  useLazyMeQuery,
  useGetDecksByIdQuery,
  useMeEditNicknameMutation,
  useRecoveryPasswordMutation,
} = extendedApi;
