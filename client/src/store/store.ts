import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import serversSlice from "./slices/serversSlice";
import activeServerSlice from "./slices/activeServerSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    servers: serversSlice,
    activeServer: activeServerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
