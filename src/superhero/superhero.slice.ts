import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ISuperhero {
  _id?: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export type UpdateSuperheroPayload = {
  _id: string;
  superhero: Partial<ISuperhero>;
};

export interface SuperheroState {
  superheroes: ISuperhero[];
  selectedSuperhero: ISuperhero | null;
  loading: boolean;
  error: string | null;
}

interface PaginationState {
  currentPage: number;
  perPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  perPage: 5,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;
export const selectPerPage = () => 5;

export default paginationSlice;
