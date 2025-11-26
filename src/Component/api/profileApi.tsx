import axiosInstance from './axiosConfig';
import type { ProfileData, UpdateProfileData } from '../types/Types';
import type { AxiosError } from 'axios';

export const fetchUserProfile = async (): Promise<ProfileData> => {
    try {
        const response = await axiosInstance.get<{ user: ProfileData }>('/profile'); // ✅ Relative path
        return response.data.user;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to fetch user profile';
        throw new Error(errorMessage);
    }
};

export const updateUserProfile = async (profileData: UpdateProfileData): Promise<ProfileData> => {
    try {
        const response = await axiosInstance.patch<{ user: ProfileData }>('/profile', profileData); // ✅ Relative path
        return response.data.user;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to update user profile';
        throw new Error(errorMessage);
    }
};