// src/Component/slices/profileSlice.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile, updateUserProfile } from '../api/profileApi'; // Removed updateUserPassword
import type { ProfileData, UpdateProfileData } from '../types/Types';

interface ProfileState {
    profile: ProfileData | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profile: null,
    isLoading: false,
    error: null,
};

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchUserProfile();
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (profileData: UpdateProfileData, { rejectWithValue }) => {
        try {
            const response = await updateUserProfile(profileData);
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
            return rejectWithValue(errorMessage);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<ProfileData>) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<ProfileData>) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;