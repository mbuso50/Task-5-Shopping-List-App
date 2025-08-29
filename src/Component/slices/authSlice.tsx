// src/Component/slices/authSlice.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../api/authApi';
import type { User, AuthState, AuthResponse } from '../types/Types';

const getInitialState = (): AuthState => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    return {
        user: userStr ? JSON.parse(userStr) : null,
        token: token,
        isAuthenticated: !!token,
        isLoading: false,
        error: null,
    };
};

const initialState: AuthState = getInitialState();

export const loginUserAsync = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginUser(credentials);
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            return rejectWithValue(errorMessage);
        }
    }
);

export const registerUserAsync = createAsyncThunk(
    'auth/register',
    async (credentials: { name: string; surname: string; cellNumber: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await registerUser(credentials);
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        },
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUserAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            })
            // Register cases
            .addCase(registerUserAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUserAsync.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;