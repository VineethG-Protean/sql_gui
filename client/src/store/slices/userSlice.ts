import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
    id: number,
    email: string
    username: string,
    name: string,
    role: "admin" | "server_admin" | "database_admin" | "user_l1" | "user_l2",
}

const initialState: UserInterface = {
    id: 0,
    email: "",
    username: "",
    name: "",
    role: "user_l2"
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<UserInterface>) => {
            return action.payload;
        },
        getUser: (_state, action: PayloadAction<UserInterface>) => {
            _state = action.payload
        },
        resetUser: () => initialState
    }
});

export const { setUser, getUser, resetUser } = userSlice.actions;
export default userSlice.reducer;