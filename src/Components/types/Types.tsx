// task-5-shopping-list-app/src/Components/types/Types.tsx
import type { ReactNode, Dispatch, SetStateAction } from 'react';

export interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
    onSwitchToRegister: () => void;
    onSwitchToForgotPassword: () => void;
    isLoading?: boolean;
}
export interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
    onSwitchToRegister: () => void;
    onSwitchToForgotPassword: () => void;
    isLoading?: boolean;
}

export interface RegistrationFormProps {
    onRegister: (name: string, email: string, password: string) => void;
    onSwitchToLogin: () => void;
    isLoading?: boolean;
}

export interface ForgotPasswordFormProps {
    onResetPassword: (email: string) => void;
    onSwitchToLogin: () => void;
    isLoading?: boolean;
}

export interface RegistrationFormProps {
    onRegister: (name: string, email: string, password: string) => void;
    onSwitchToLogin: () => void;
    isLoading?: boolean;
}

export interface ForgotPasswordFormProps {
    onResetPassword: (email: string) => void;
    onSwitchToLogin: () => void;
    isLoading?: boolean;
}

export interface ButtonProps {
    onClick?: () => void;
    button_size?: 'small' | 'medium' | 'large';
    type?: 'Sign_in' | 'Log_in' | 'create_list' | 'forgotten' | 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'forty';
    children: ReactNode;
    className?: string;
}

export interface WelcomeComponentProps {
    onLogin: () => void;
    onSignUp: () => void;
    onCreateList: () => void;
    onSeeDemo: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export interface NavbarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export type ButtonSize = NonNullable<ButtonProps['button_size']>;
export type ButtonVariant = NonNullable<ButtonProps['variant']>;
export type ButtonType = NonNullable<ButtonProps['type']>;

export type OnLogin = WelcomeComponentProps['onLogin'];
export type OnSignUp = WelcomeComponentProps['onSignUp'];
export type OnCreateList = WelcomeComponentProps['onCreateList'];
export type OnSeeDemo = WelcomeComponentProps['onSeeDemo'];
export type OnLogout = WelcomeComponentProps['onLogout'];
export type IsLoggedIn = WelcomeComponentProps['isLoggedIn'];