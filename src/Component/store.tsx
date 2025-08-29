// src/Component/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shoppingListReducer from './slices/shoppingListSlice';
import profileReducer from './slices/profileSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        shoppingLists: shoppingListReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;