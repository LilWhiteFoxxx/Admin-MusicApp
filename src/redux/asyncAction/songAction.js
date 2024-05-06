import { createAsyncThunk } from "@reduxjs/toolkit";

import * as songApi from "../../api/song_api";

export const createSongAction = createAsyncThunk(
    "/admin/song",
    async (data, { rejectWithValue }) => {
        try {
            const res = await songApi.createNewSong(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteSongByIdAction = createAsyncThunk(
    "delete/admin/song",
    async (data, { rejectWithValue }) => {
        try {
            const res = await songApi.deleteSongById(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateSongByIdAction = createAsyncThunk(
    "update/admin/song",
    async (data, { rejectWithValue }) => {
        try {
            const res = await songApi.updateSongById(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
