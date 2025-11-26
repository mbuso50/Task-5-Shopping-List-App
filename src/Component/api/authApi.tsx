import axiosInstance from './axiosConfig';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/Types';
import type { AxiosError } from 'axios';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/api/auth/login', credentials);
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            console.log(' User stored in localStorage:', response.data.user);
        }

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Login failed';
        throw new Error(errorMessage);
    }
};

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/api/auth/register', credentials);

        // Store user data in localStorage
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            console.log(' User stored in localStorage:', response.data.user);
        }

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Registration failed';
        throw new Error(errorMessage);
    }
};