import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { houseSlice, HouseState } from "./houseSlice";

const persistConfig = {
  key: "root:v5",
  storage,
};

export type AppState = {
  [houseSlice.name]: HouseState;
};

const reducer = combineReducers({
  [houseSlice.name]: houseSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
