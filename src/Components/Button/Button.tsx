import React from 'react';
import type { ButtonProps } from '../types/Types';

const Button: React.FC<ButtonProps & { className?: string }> = ({
    onClick,
    button_size = 'medium', // Provide default value
    type,
    disabled = false,
    variant = 'primary', // Provide default value
    children,
    className = ''
}) => {
    // Base classes
    const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    // Size classes
    const sizeClasses = {
        small: "px-3 py-1.5 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg"
    };

    // Variant classes
    const variantClasses = {
        primary: "bg-[#5409DA] text-white hover:bg-[#4507B5] focus:ring-[#5409DA]",
        secondary: "bg-white text-[#5409DA] border border-[#5409DA] hover:bg-[#F0F0FF] focus:ring-[#5409DA]",
        tertiary: "bg-transparent text-[#5409DA] hover:bg-[#F0F0FF] focus:ring-[#5409DA] underline",
        forty: "" // Add the forty variant with empty string as fallback
    };

    // Type-specific classes
    const typeClasses = {
        Log_in: "",
        Sign_in: "",
        create_list: "",
        forgotten: ""
    };

    // Determine the actual button type for form submission
    const getButtonType = (): 'button' | 'submit' | 'reset' => {
        if (type === 'Sign_in' || type === 'Log_in') return 'submit';
        return 'button';
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    // Safely get type-specific classes with fallback
    const typeSpecificClasses = type ? typeClasses[type as keyof typeof typeClasses] : '';

    // Safely get size class with fallback - button_size now has default value
    const sizeClass = sizeClasses[button_size];

    // Safely get variant class with fallback - variant now has default value
    const variantClass = variantClasses[variant as keyof typeof variantClasses] || variantClasses.primary;

    // Combine all classes
    const buttonClasses = `
        ${baseClasses}
        ${sizeClass}
        ${variantClass}
        ${typeSpecificClasses}
        ${disabledClasses}
        ${className}
    `.replace(/\s+/g, ' ').trim();

    return (
        <button
            type={getButtonType()}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
            data-button-type={type}
        >
            {children}
        </button>
    );
};

export default Button;