import { createSlice } from "@reduxjs/toolkit";
import {
    createArtistAction,
    deleteArtistAction,
    updateArtistAction,
} from "../asyncAction/artistAction";

const initialState = {
    isCurrent: [],
    isPending: false,
    isError: false,
};

const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createArtistAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(createArtistAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false;
            state.isCurrent = action.payload;
        });

        builder.addCase(createArtistAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });

        builder.addCase(updateArtistAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(updateArtistAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false;
        });

        builder.addCase(updateArtistAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });

        //del
        builder.addCase(deleteArtistAction.pending, (state) => {
            state.isPending = true;
            state.isError = false;
        });

        builder.addCase(deleteArtistAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isError = false;
        });

        builder.addCase(deleteArtistAction.rejected, (state) => {
            state.isPending = false;
            state.isError = true;
        });
    },
});

export const {} = artistSlice.actions;

export default artistSlice.reducer;
