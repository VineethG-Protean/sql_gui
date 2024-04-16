import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Servers } from "@/lib/interfaces";

const initialState: Servers = {
  id: "",
  name: "",
  protocol: "",
  host: "",
  port: "",
  username: "",
  password: "",
  type: "",
  created_at: "",
  modified_at: "",
};

export const activeServerSlice = createSlice({
  name: "activeServer",
  initialState,
  reducers: {
    setActiveServer: (_state, action: PayloadAction<Servers>) => {
      return action.payload;
    },
    getActiveServer: (_state, action: PayloadAction<Servers>) => {
      _state = action.payload;
    },
    resetActiveServer: () => initialState,
  },
});

export const { setActiveServer, getActiveServer, resetActiveServer } =
  activeServerSlice.actions;
export default activeServerSlice.reducer;
