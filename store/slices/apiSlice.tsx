// store/slices/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Replace with your base URL
  tagTypes: ["Exercises"],
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => "/exercises",
      providesTags: ["Exercises"], // Cache tag for invalidation
    }),
    addExerciseToAPI: builder.mutation({
      query: (exercise) => ({
        url: "/exercises",
        method: "POST",
        body: exercise,
      }),
      invalidatesTags: ["Exercises"], // Invalidate cache
    }),
  }),
});

export const { useGetExercisesQuery, useAddExerciseToAPIMutation } = apiSlice;
