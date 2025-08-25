// task-5-shopping-list-app/src/Components/features/form/ForgettonPassword-feature.tsx
import React, { useState } from 'react';
import Button from '../../Button/Button';
import type { ForgotPasswordFormProps } from '../../types/Types';

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
    onResetPassword,
    onSwitchToLogin,
    isLoading = false
}) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onResetPassword(email);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
                <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-[#5409DA]">Check Your Email</h2>
                        <p className="mt-2 text-sm text-[#4E71FF]">
                            We've sent a password reset link to {email}
                        </p>
                    </div>

                    <div className="mt-8">
                        <Button
                            type="button"
                            variant="primary"
                            button_size="large"
                            onClick={onSwitchToLogin}
                            disabled={isLoading}
                            className="w-full justify-center"
                        >
                            Return to Sign In
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                    <img
                        src="/Verse_Shoppers-removebg.png"
                        alt="ShopList Pro"
                        className="h-16 w-auto mx-auto mb-4"
                    />
                    <h2 className="text-3xl font-bold text-[#5409DA]">Reset Password</h2>
                    <p className="mt-2 text-sm text-[#4E71FF]">
                        Enter your email to receive a reset link
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                        <Button
                            type="submit"
                            variant="primary"
                            button_size="large"
                            disabled={isLoading}
                            className="w-full justify-center"
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            disabled={isLoading}
                            className="text-sm text-[#4E71FF] hover:text-[#5409DA] transition-colors disabled:opacity-50"
                        >
                            Back to Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;