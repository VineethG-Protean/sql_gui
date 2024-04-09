import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
    id: number,
    email: string
    username: string,
    name: string,
    role: string,
}

const initialState: UserInterface = {
    id: 0,
    email: "",
    username: "",
    name: "",
    role: ""
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