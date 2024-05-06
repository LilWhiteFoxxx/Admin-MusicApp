import { createSlice } from "@reduxjs/toolkit";
import {
    createAlbumAction,
    deleteAlbumAction,
    updateAlbumAction,
} from "../asyncAction/albumAction";

const initialState = {
    isCurrent: [],
    isPending: false,
    isError: false,
};

const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAlbumAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(createAlbumAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false;
            state.isCurrent = action.payload;
        });

        builder.addCase(createAlbumAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });

        builder.addCase(updateAlbumAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(updateAlbumAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false;
        });

        builder.addCase(updateAlbumAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });

        //del
        builder.addCase(deleteAlbumAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(deleteAlbumAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false;
        });

        builder.addCase(deleteAlbumAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });
    },
});

export const {} = albumSlice.actions;

export default albumSlice.reducer;
