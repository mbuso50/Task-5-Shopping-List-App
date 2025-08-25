// task-5-shopping-list-app/src/Components/features/form/Registration-form.tsx
import React, { useState } from 'react';
import Button from '../../Button/Button';
import type { RegistrationFormProps } from '../../types/Types';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onRegister,
    onSwitchToLogin,
    isLoading = false
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = 'Name is required';
        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        await onRegister(name, email, password);
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
                    <h2 className="text-3xl font-bold text-[#5409DA]">Create Account</h2>
                    <p className="mt-2 text-sm text-[#4E71FF]">
                        Join us and start organizing your shopping
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#5409DA]">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                className={`mt-1 block w-full px-4 py-3 border rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50 ${errors.name ? 'border-red-500' : 'border-[#8DD8FF]'
                                    }`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

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
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className={`mt-1 block w-full px-4 py-3 border rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50 ${errors.password ? 'border-red-500' : 'border-[#8DD8FF]'
                                    }`}
                                placeholder="Create a password"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5409DA]">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                                className={`mt-1 block w-full px-4 py-3 border rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50 ${errors.confirmPassword ? 'border-red-500' : 'border-[#8DD8FF]'
                                    }`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            button_size="large"
                            disabled={isLoading}
                            className="w-full justify-center"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-[#4E71FF]">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                disabled={isLoading}
                                className="font-medium text-[#5409DA] hover:text-[#4E71FF] transition-colors disabled:opacity-50"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;