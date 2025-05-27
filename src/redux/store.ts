import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from "./slices/authSlice";
import { postSlice } from "./slices/postSlice";
import viewReducer from "./slices/viewSlice";

const persistConfig = {
    key: 'view',
    version: 1,
    storage,
};

const viewModeReducer = persistReducer(persistConfig, viewReducer);

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        post: postSlice.reducer,
        view: viewModeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;