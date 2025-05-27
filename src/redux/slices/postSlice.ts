import { IPost } from "@/types/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostSliceState {
    selectedPost: IPost | null
}

const initialState: PostSliceState = {
    selectedPost: null
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        updateSelectedPost: (state, action: PayloadAction<IPost>) => {
            state.selectedPost = action.payload;
        },
        clearSelectedPost: (state) => {
            state.selectedPost = null;
        }
    }
})

export const { updateSelectedPost, clearSelectedPost } = postSlice.actions;

export default postSlice.reducer;