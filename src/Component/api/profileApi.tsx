// src/Component/api/profileApi.tsx
import type { ProfileData, UpdateProfileData } from '../types/Types'; // Removed UpdatePasswordData

const API_BASE_URL = 'http://localhost:3001';

export const fetchUserProfile = async (): Promise<ProfileData> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data.user;
};

export const updateUserProfile = async (profileData: UpdateProfileData): Promise<ProfileData> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error('Failed to update user profile');
    }

    const data = await response.json();
    return data.user;
};

// Remove updateUserPassword function since it's not used