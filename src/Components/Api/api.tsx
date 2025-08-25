// task-5-shopping-list-app/src/Api/api.ts
const API_BASE_URL = '/api';

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

// Store token in localStorage
export const storeToken = (token: string) => {
    localStorage.setItem('authToken', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

export const removeToken = () => {
    localStorage.removeItem('authToken');
};

// API calls
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }

    return response.json();
};

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
    }

    return response.json();
};

export const getProfile = async (token: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    return data.user;
};