import { createAsyncThunk } from "@reduxjs/toolkit";
import * as albumApi from "../../api/album_api";

export const getAllAlbumAction = createAsyncThunk(
    "admin/album",
    async (data, { rejectWithValue }) => {
        try {
            const res = await albumApi.getAllAlbum(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const createAlbumAction = createAsyncThunk(
    "create/admin/album",
    async (data, { rejectWithValue }) => {
        try {
            const res = await albumApi.createNewAlbum(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateAlbumAction = createAsyncThunk(
    "update/admin/album",
    async (data, { rejectWithValue }) => {
        try {
            const res = await albumApi.updatedAlbumById(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteAlbumAction = createAsyncThunk(
    "delete/admin/album",
    async (data, { rejectWithValue }) => {
        try {
            const res = await albumApi.deleteAlbumById(data);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
