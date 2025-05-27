import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewSliceState {
    isAdvancedView: boolean;
}

const initialState: ViewSliceState = {
    isAdvancedView: false
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setViewAdvanced: (state, action: PayloadAction<boolean>) => {
            state.isAdvancedView = action.payload;
        }
    }
})

export const { setViewAdvanced } = viewSlice.actions;

export default viewSlice.reducer;