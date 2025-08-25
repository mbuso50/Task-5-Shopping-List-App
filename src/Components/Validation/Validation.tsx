// Update your validation file
import type { ButtonSize, ButtonVariant, ButtonType } from '../types/Types';

export const validateButtonSize = (size: string): size is ButtonSize => {
    return ['small', 'medium', 'large'].includes(size);
};

export const validateButtonVariant = (variant: string): variant is ButtonVariant => {
    return ['primary', 'secondary', 'tertiary', 'forty'].includes(variant);
};

export const validateButtonType = (type: string): type is ButtonType => {
    return ['Sign_in', 'Log_in', 'create_list', 'forgotten', 'button', 'submit', 'reset'].includes(type);
};

export const getValidatedSize = (size: string | undefined): ButtonSize => {
    return size && validateButtonSize(size) ? size : 'medium';
};

export const getValidatedVariant = (variant: string | undefined): ButtonVariant => {
    return variant && validateButtonVariant(variant) ? variant : 'primary';
};

export const getValidatedType = (type: string | undefined): ButtonType => {
    return type && validateButtonType(type) ? type : 'button';
};

export const sizeClasses: Record<ButtonSize, string> = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
};

export const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#5409DA] hover:bg-[#4507B5] text-white focus:ring-[#5409DA]',
    secondary: 'bg-white text-[#5409DA] border border-[#5409DA] hover:bg-[#F0F0FF] focus:ring-[#5409DA]',
    tertiary: 'bg-transparent text-[#5409DA] hover:bg-[#F0F0FF] focus:ring-[#5409DA] underline',
    forty: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500'
};

export const typeClasses: Record<ButtonType, string> = {
    Sign_in: 'rounded-full',
    Log_in: 'rounded-md',
    create_list: 'shadow-lg',
    forgotten: 'underline',
    button: '',
    submit: '',
    reset: ''
};

export const baseClasses = 'transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';