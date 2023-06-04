import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import api from "./api/api";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import paginationSlice from "./superhero/superhero.slice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    pagination: paginationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
