import { IUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSliceState {
    user: IUser | null
}

const initialState: AuthSliceState = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        }
    }
})

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;