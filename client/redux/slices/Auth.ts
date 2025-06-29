import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (payload: { email; password }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'http://localhost:3333/auth/login',

                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                },
            ).then((res) => res.json());
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout(state) {
            state.token = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
