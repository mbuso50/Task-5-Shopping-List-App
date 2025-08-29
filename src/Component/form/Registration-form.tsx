import React, { useState } from 'react';
import Button from '../Button/Button';
import type { RegistrationFormProps } from '../types/Types';
import { validateRegistrationForm, clearFieldError } from '../Validation/Validation';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onRegister,
    onSwitchToLogin,
    isLoading = false
}) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        cellNumber: '', // Keep this field as required by objective
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors = validateRegistrationForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await onRegister(
            formData.name,
            formData.surname,
            formData.cellNumber,
            formData.email,
            formData.password
        );
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
                    <h2 className="text-3xl font-bold text-[#5409DA]">Create Account</h2>
                    <p className="mt-2 text-sm text-[#4E71FF]">
                        Join us and start organizing your shopping
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#5409DA]">
                                First Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="given-name"
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                disabled={isLoading}
                                className={`mt-1 block w-full px-4 py-3 border rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50 ${errors.name ? 'border-red-500' : 'border-[#8DD8FF]'
                                    }`}
                                placeholder="Enter your first name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="surname" className="block text-sm font-medium text-[#5409DA]">
                                Last Name
                            </label>
                            <input
                                id="surname"
                                name="surname"
                                type="text"
                                autoComplete="family-name"
                                required
                                value={formData.surname}
                                onChange={(e) => handleInputChange('surname', e.target.value)}
                                disabled={isLoading}
                                className={`mt-1 block w-full px-4 py-3 border rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50 ${errors.surname ? 'border-red-500' : 'border-[#8DD8FF]'
                                    }`}
                                placeholder="Enter your last name"
                            />
                            {errors.surname && <p className="mt-1 text-sm text-red-500">{errors.surname}</p>}
                        </div>

                        <div>
                            <label htmlFor="cellNumber" className="block text-sm font-medium text-[#5409DA]">
                                Phone Number
                            </label>
                            <input
                                id="cellNumber"
                                name="cellNumber"
                                type="tel"
                                autoComplete="tel"
                                required
                                value={formData.cellNumber}
                                onChange={(e) => handleInputChange('cellNumber', e.target.value)}
                                disabled={isLoading}
                                className={`mt-1 block w-full px-4 py-3 border rounded-lg placeholder-[#BBFBFF] text-[#5409DA] focus:ring-2 focus:ring-[#5409DA] focus:border-transparent disabled:opacity-50 ${errors.cellNumber ? 'border-red-500' : 'border-[#8DD8FF]'
                                    }`}
                                placeholder="Enter your phone number"
                            />
                            {errors.cellNumber && <p className="mt-1 text-sm text-red-500">{errors.cellNumber}</p>}
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
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
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
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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