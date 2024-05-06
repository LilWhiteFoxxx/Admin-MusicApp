import { createAsyncThunk } from "@reduxjs/toolkit";
import * as artistApi from "../../api/artists_api";

export const createArtistAction = createAsyncThunk(
    "create/admin/artists/",
    async (data, { rejectWithValue }) => {
        try {
            const res = await artistApi.createAtrists(data);
            console.log(res);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateArtistAction = createAsyncThunk(
    "update/admin/artists/",
    async (data, { rejectWithValue }) => {
        try {
            const res = await artistApi.updateArtistById(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteArtistAction = createAsyncThunk(
    "delete/admin/artists/",
    async (data, { rejectWithValue }) => {
        try {
            const res = await artistApi.deleteArtistById(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
