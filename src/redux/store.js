import { combineReducers, configureStore } from "@reduxjs/toolkit";
import songSlice from "./slice/songSlice";
import artistSlice from "./slice/artistSlice";
import albumSlice from "./slice/albumSlice";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
    key: "music/app",
    version: 1,
    storage,
};

const authPersistConfig = {
    ...rootPersistConfig,
    whitelist: ["currentUser", "token"],
};

const store = configureStore({
    reducer: {
        song: songSlice,
        artist: artistSlice,
        album: albumSlice,
        // auth: persistReducer(authPersistConfig, authSlice)
    },
});

export const persistor = persistStore(store);

export default store;
