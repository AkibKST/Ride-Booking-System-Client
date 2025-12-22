import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),

  // Define the types of tags that can be invalidated or provided by endpoints for caching purposes
  tagTypes: ["USER", "RIDE", "BOOKING", "DRIVER"],
  endpoints: () => ({}),
});
