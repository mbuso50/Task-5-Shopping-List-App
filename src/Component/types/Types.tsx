// src/Component/types/Types.tsx
import type { ReactNode, Dispatch, SetStateAction } from 'react';

// Navbar Props
export interface NavbarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
    onNavigateHome?: () => void;
}

export interface RegistrationFormProps {
    onRegister: (name: string, surname: string, cellNumber: string, email: string, password: string) => void;
    onSwitchToLogin: () => void;
    isLoading?: boolean;
}

// User and Profile Types
export interface User {
    id: string;
    name: string;
    email: string;
    surname?: string;
    cellNumber?: string;
    createdAt?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface ProfileData extends User {
    profileImage?: string;
    notificationsEnabled: boolean;
    darkMode: boolean;
    emailNotifications: boolean;
    phone?: string;
    address?: string;
    lastLogin?: string;
}

export interface UpdateProfileData {
    name?: string;
    surname?: string;
    cellNumber?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface UpdatePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
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
    surname: string;
    email: string;
    cellNumber: string;
    password: string;
    confirmPassword?: string;
}

// Shopping List Types
export interface ShoppingItem {
    id: string;
    shoppingListId: string;
    name: string;
    completed: boolean;
    category: string;
    quantity: number;
    notes?: string;
    images?: string[];
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
}

export interface CreateShoppingListItemDto {
    name: string;
    quantity: number;
    notes?: string;
    category: string;
    images?: string[];
}

// Form and Validation Types
export interface AuthFormData {
    email: string;
    password: string;
    name?: string;
    surname?: string;
    cellNumber?: string;
    confirmPassword?: string;
}

export interface ValidationErrors {
    [key: string]: string;
}

export interface ValidationRules {
    [key: string]: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        custom?: (value: string) => string | null;
    };
}

export interface FormFieldProps {
    name: string;
    label: string;
    type: string;
    value: string;
    onChange: (field: string, value: string) => void;
    placeholder: string;
    disabled?: boolean;
    error?: string;
    autoComplete?: string;
    required?: boolean;
}

// Welcome Component Props
export interface WelcomeComponentProps {
    onCreateList: () => void;
    onSeeDemo: () => void;
    isLoggedIn: boolean;
}

// Component Props
export interface ButtonProps {
    onClick?: () => void;
    button_size?: 'small' | 'medium' | 'large';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary';
    children: ReactNode;
    className?: string;
}

// Button Type Aliases
export type ButtonSize = NonNullable<ButtonProps['button_size']>;
export type ButtonVariant = NonNullable<ButtonProps['variant']>;
export type ButtonType = NonNullable<ButtonProps['type']>;

// Validator Function Types
export type ValidatorFunction = (value: string) => string | null;
export type EmailValidator = (email: string) => string | null;
export type PasswordValidator = (password: string) => string | null;
export type NameValidator = (name: string) => string | null;
export type ConfirmPasswordValidator = (password: string, confirmPassword: string) => string | null;

export interface ShoppingListProps {
    onBackToDemo?: () => void;
    onSaveList?: () => void;
    onLogout?: () => void;
}

export interface FooterProps {
    className?: string;
}

// Form Props
export interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
    onSwitchToForgotPassword: () => void;
    onSwitchToRegister: () => void;
    isLoading?: boolean;
}

// Profile Component Props
export interface ProfileSectionProps {
    profile: ProfileData;
    onUpdateProfile: (updates: Partial<ProfileData>) => void;
}

export interface ProfileSidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

// Page State Types
export type AppPage = 'home' | 'shopping-list' | 'auth' | 'profile' | 'demo';

export interface ShoppingListState {
    items: ShoppingItem[];
    isLoading: boolean;
    error: string | null;
    filters: {
        searchTerm: string;
        sortBy: 'name' | 'category' | 'date';
        filterCategory: string;
    };
}

export interface ForgotPasswordFormProps {
    onResetPassword: (email: string) => void;
    onSwitchToLogin: () => void;
    isLoading?: boolean;
}

// Alias for UserProfile (use ProfileData instead)
export type UserProfile = ProfileData;