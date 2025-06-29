import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/Auth';

export const store = configureStore({
    reducer: {
        auth,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
