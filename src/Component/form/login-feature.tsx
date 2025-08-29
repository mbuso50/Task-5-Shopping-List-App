import React, { useState } from 'react';
import Button from '../Button/Button';
import type { LoginFormProps } from '../types/Types';
import { validateLoginForm, clearFieldError } from '../Validation/Validation';

const LoginForm: React.FC<LoginFormProps> = ({
    onLogin,
    onSwitchToRegister,
    onSwitchToForgotPassword,
    isLoading = false
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors = validateLoginForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await onLogin(formData.email, formData.password);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => clearFieldError(prev, field));
        }
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
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                disabled={isLoading}
                                className={`mt-1 block w-full px-4 py-3 border rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50 ${errors.email ? 'border-red-500' : 'border-[#8DD8FF]'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
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
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                disabled={isLoading}
                                className={`mt-1 block w-full px-4 py-3 border rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50 ${errors.password ? 'border-red-500' : 'border-[#8DD8FF]'
                                    }`}
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
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