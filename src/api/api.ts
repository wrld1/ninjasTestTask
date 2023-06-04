import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ISuperhero,
  UpdateSuperheroPayload,
} from "@/superhero/superhero.slice";

const API_URL = "http://localhost:5000";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  tagTypes: ["Superheroes"],
  endpoints: (builder) => ({
    getSuperheroes: builder.query<ISuperhero[], void>({
      query: () => "superheroes",
      providesTags: ["Superheroes"],
    }),
    createSuperhero: builder.mutation<ISuperhero, Partial<ISuperhero>>({
      query: (superhero) => ({
        url: "superheroes",
        method: "POST",
        body: superhero,
      }),
      invalidatesTags: ["Superheroes"],
    }),
    updateSuperhero: builder.mutation<ISuperhero, UpdateSuperheroPayload>({
      query: ({ _id, superhero }) => ({
        url: `superheroes/${_id}`,
        method: "PUT",
        body: superhero,
      }),
      invalidatesTags: ["Superheroes"],
    }),
    deleteSuperhero: builder.mutation<void, string>({
      query: (_id) => ({
        url: `superheroes/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Superheroes"],
    }),
  }),
});

export const {
  useGetSuperheroesQuery,

  useCreateSuperheroMutation,
  useUpdateSuperheroMutation,
  useDeleteSuperheroMutation,
} = api;

export default api;
