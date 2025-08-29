import React from 'react';
import type { ButtonProps } from '../types/Types';

const Button: React.FC<ButtonProps & { className?: string }> = ({
    onClick,
    button_size = 'medium',
    type = 'button',
    disabled = false,
    variant = 'primary',
    children,
    className = ''
}) => {

    const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const sizeClasses = {
        small: "px-3 py-1.5 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg"
    };

    const variantClasses = {
        primary: "bg-[#5409DA] text-white hover:bg-[#4507B5] focus:ring-[#5409DA]",
        secondary: "bg-white text-[#5409DA] border border-[#5409DA] hover:bg-[#F0F0FF] focus:ring-[#5409DA]",
        tertiary: "bg-transparent text-[#5409DA] hover:bg-[#F0F0FF] focus:ring-[#5409DA] underline"
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const sizeClass = sizeClasses[button_size];
    const variantClass = variantClasses[variant] || variantClasses.primary;

    const buttonClasses = `
        ${baseClasses}
        ${sizeClass}
        ${variantClass}
        ${disabledClasses}
        ${className}
    `.replace(/\s+/g, ' ').trim();

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {children}
        </button>
    );
};

export default Button;