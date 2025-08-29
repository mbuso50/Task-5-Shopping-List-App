// src/Components/pages/AuthPage.tsx
import React, { useState } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import LoginForm from '../form/login-feature';
import RegistrationForm from '../form/Registration-form';
import ForgotPasswordForm from '../form/ForgettonPassword-feature';
import { loginUser, registerUser } from '../api/authApi';
import type { AuthResponse, RegisterCredentials } from '../types/Types';

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
            localStorage.setItem('token', response.token);
            // Simple redirect to shopping page
            window.location.href = '/shopping';
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (name: string, surname: string, cellNumber: string, email: string, password: string) => {
        setIsLoading(true);
        setError('');
        try {
            const credentials: RegisterCredentials = {
                name,
                surname,
                cellNumber,
                email,
                password
            };
            const response: AuthResponse = await registerUser(credentials);
            localStorage.setItem('token', response.token);
            // Simple redirect to shopping page
            window.location.href = '/shopping';
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (email: string) => {
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
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <PropagateLoader
                        color="hsla(175, 69%, 44%, 1)"
                        cssOverride={{}}
                        loading={isLoading}
                        size={24}
                        speedMultiplier={1}
                    />
                </div>
            )}

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