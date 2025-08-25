// task-5-shopping-list-app/src/Components/pages/Auth-page.tsx
import React, { useState } from 'react';
import LoginForm from '../features/form/login-feature';
import RegistrationForm from '../features/form/Registration-form';
import ForgotPasswordForm from '../features/form/ForgettonPassword-feature';
import { loginUser, registerUser, storeToken } from '../Api/api';
import type { AuthResponse } from '../Api/api';

type AuthMode = 'login' | 'register' | 'forgot-password';

const AuthPage: React.FC = () => {
    const [authMode, setAuthMode] = useState<AuthMode>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);
        setError('');
        try {
            const response: AuthResponse = await loginUser({ email, password });
            storeToken(response.token);
            // Redirect to home page or dashboard
            window.location.href = '/';
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setError('');
        try {
            const response: AuthResponse = await registerUser({ name, email, password });
            storeToken(response.token);
            // Redirect to home page or dashboard
            window.location.href = '/';
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (email: string) => {
        // Implement password reset logic here
        console.log('Password reset requested for:', email);
        alert(`Password reset instructions sent to ${email}`);
    };

    const switchToRegister = () => {
        setAuthMode('register');
        setError('');
    };

    const switchToLogin = () => {
        setAuthMode('login');
        setError('');
    };

    const switchToForgotPassword = () => {
        setAuthMode('forgot-password');
        setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            {error && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto z-50">
                    {error}
                </div>
            )}

            {authMode === 'login' && (
                <LoginForm
                    onLogin={handleLogin}
                    onSwitchToRegister={switchToRegister}
                    onSwitchToForgotPassword={switchToForgotPassword}
                    isLoading={isLoading}
                />
            )}

            {authMode === 'register' && (
                <RegistrationForm
                    onRegister={handleRegister}
                    onSwitchToLogin={switchToLogin}
                    isLoading={isLoading}
                />
            )}

            {authMode === 'forgot-password' && (
                <ForgotPasswordForm
                    onResetPassword={handleResetPassword}
                    onSwitchToLogin={switchToLogin}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default AuthPage;