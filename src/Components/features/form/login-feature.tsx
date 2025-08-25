// task-5-shopping-list-app/src/Components/features/form/login-feature.tsx
import React, { useState } from 'react';
import Button from '../../Button/Button';
import type { LoginFormProps } from '../../types/Types';

const LoginForm: React.FC<LoginFormProps> = ({
    onLogin,
    onSwitchToRegister,
    onSwitchToForgotPassword,
    isLoading = false
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onLogin(email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                    <img
                        src="/Verse_Shoppers-removebg.png"
                        alt="ShopList Pro"
                        className="h-16 w-auto mx-auto mb-4"
                    />
                    <h2 className="text-3xl font-bold text-[#5409DA]">Welcome Back</h2>
                    <p className="mt-2 text-sm text-[#4E71FF]">
                        Sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#5409DA]">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="mt-1 block w-full px-4 py-3 border border-[#8DD8FF] rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#5409DA]">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="mt-1 block w-full px-4 py-3 border border-[#8DD8FF] rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onSwitchToForgotPassword}
                            disabled={isLoading}
                            className="text-sm text-[#4E71FF] hover:text-[#5409DA] transition-colors disabled:opacity-50"
                        >
                            Forgot your password?
                        </button>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            button_size="large"
                            disabled={isLoading}
                            className="w-full justify-center"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-[#4E71FF]">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                disabled={isLoading}
                                className="font-medium text-[#5409DA] hover:text-[#4E71FF] transition-colors disabled:opacity-50"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;