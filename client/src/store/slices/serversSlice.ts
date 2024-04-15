import { Servers } from "@/lib/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Servers[] = [];

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    setServers: (_state, action: PayloadAction<Servers[]>) => {
      return action.payload;
    },
    getServers: (_state, action: PayloadAction<Servers[]>) => {
      _state = action.payload;
    },
    resetServers: () => initialState,
  },
});

export const { setServers, getServers, resetServers } = serversSlice.actions;
export default serversSlice.reducer;
