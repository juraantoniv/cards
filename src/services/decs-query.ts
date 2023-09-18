import { decksResponse } from "../../types.ts";
import { lernType } from "../components/ui/learnPackComponent";
import { FormLoginType } from "../components/ui/login";
import { meType } from "../Pages/layout/MainLayout.tsx";

import { baseApi } from "./base-api.tsx";

type getDecksArgs =
  | {
      minCardsCount?: string;
      maxCardsCount?: string;
      name?: string;
      authorId?: string;
      orderBy?: string;
      currentPage?: string;
      itemsPerPage?: string;
    }
  | undefined;
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
  id?: string;
  answer?: string;
  question?: string;
  questionImg?: any;
  answerImg?: any;
  data?: FormData;
};

type authEdit = {
  name?: string;
  avatar?: FormData;
};

const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDecks: builder.query<decksResponse, getDecksArgs>({
        query: (params) => {
          return {
            url: `/v1/decks`,
            params: params,
          };
        },
        providesTags: ["Decks"],
      }),
      getDecksById: builder.query<userDecks, { id: string }>({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}`,
          };
        },
        providesTags: ["getName"],
      }),
      getById: builder.query<userDecks, { id: string }>({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}`,
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
          };
        },
        providesTags: ["Cards"],
      }),
      getCardById: builder.query<Items, { id: string | undefined }>({
        query: (arg) => {
          return {
            url: `/v1/cards/${arg.id}`,
          };
        },
        providesTags: ["Cards"],
      }),
      me: builder.query<meType | null, void>({
        query: () => {
          return {
            url: `/v1/auth/me`,
          };
        },
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ["Decks"],
      }),
      meEditNickname: builder.mutation<meType, authEdit>({
        query: (arg) => {
          return {
            url: `/v1/auth/me`,
            method: "PATCH",
            body: arg.avatar ? arg.avatar : { name: arg.name },
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
        invalidatesTags: ["Decks", "getName"],
      }),
      createCard: builder.mutation<any, cardTypeArgs>({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}/cards`,
            method: "POST",
            body: arg.data
              ? arg.data
              : {
                  question: arg.question,
                  answer: arg.question,
                },
          };
        },
        invalidatesTags: ["Cards"],
      }),
      editCard: builder.mutation<any, cardTypeArgs>({
        query: (arg) => {
          return {
            url: `/v1/cards/${arg.id}`,
            method: "PATCH",
            body: arg.data
              ? arg.data
              : {
                  question: arg.question,
                  answer: arg.answer,
                },
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
      getRandomCard: builder.query<lernType, { id: string; cardId: string }>({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}/learn`,
            method: "GET",
            params: { previousCardId: arg.cardId },
          };
        },
      }),
      setRate: builder.mutation<
        any,
        { id: string; cardId: string | undefined; grade: number }
      >({
        query: (arg) => {
          return {
            url: `/v1/decks/${arg.id}/learn`,
            method: "POST",
            body: { cardId: arg.cardId, grade: arg.grade },
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
      logIn: builder.mutation<any, FormLoginType>({
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
            extendedApi.util.updateQueryData("me", undefined, () => {
              return null;
            }),
          );

          const patchResultDecks = dispatch(
            extendedApi.util.updateQueryData("getDecks", undefined, () => {
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
      createUser: builder.mutation({
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
  useGetRandomCardQuery,
  useSetRateMutation,
  useGetCardByIdQuery,
  useGetByIdQuery,
} = extendedApi;
