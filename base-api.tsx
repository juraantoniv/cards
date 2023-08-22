import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { customFetchBase } from "./src/base-api-with-refetch.ts";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Decks", "Cards"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({}),
});
