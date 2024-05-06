import { createSlice } from "@reduxjs/toolkit";
import {
    createSongAction,
    deleteSongByIdAction,
    updateSongByIdAction,
} from "../asyncAction/songAction";

const initialState = {
    isCurrent: [],
    isPending: false,
    isError: false,
};

const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createSongAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(createSongAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false;
            state.isCurrent = action.payload;
        });

        builder.addCase(createSongAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });
        //
        builder.addCase(deleteSongByIdAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(deleteSongByIdAction.fulfilled, (state) => {
            state.isPending = false;
            state.isError = false;
            // state.isCurrent = [];
        });

        builder.addCase(deleteSongByIdAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });

        //update
        builder.addCase(updateSongByIdAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(updateSongByIdAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false;
        });

        builder.addCase(updateSongByIdAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });
    },
});

export const {} = songSlice.actions;

export default songSlice.reducer;
