// src/Component/Validation/Validation.tsx
import type {
    ButtonSize,
    ButtonVariant,
    ButtonType,
    ValidationRules,
    ValidationErrors,
    EmailValidator,
    PasswordValidator,
    NameValidator,
    AuthFormData
} from '../types/Types';

// Button validation functions
export const validateButtonSize = (size: string): size is ButtonSize => {
    return ['small', 'medium', 'large'].includes(size);
};

export const validateButtonVariant = (variant: string): variant is ButtonVariant => {
    return ['primary', 'secondary', 'tertiary'].includes(variant);
};

export const validateButtonType = (type: string): type is ButtonType => {
    return ['button', 'submit', 'reset'].includes(type);
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

// Button styling classes
export const sizeClasses: Record<ButtonSize, string> = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
};

export const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#5409DA] hover:bg-[#4507B5] text-white focus:ring-[#5409DA]',
    secondary: 'bg-white text-[#5409DA] border border-[#5409DA] hover:bg-[#F0F0FF] focus:ring-[#5409DA]',
    tertiary: 'bg-transparent text-[#5409DA] hover:bg-[#F0F0FF] focus:ring-[#5409DA] underline'
};

export const baseClasses = 'transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';

// Field validation functions
export const validateField = (
    fieldName: string,
    value: string,
    rules: ValidationRules
): string | null => {
    const fieldRules = rules[fieldName];

    if (!fieldRules) return null;

    if (fieldRules.required && !value.trim()) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    if (fieldRules.minLength && value.length < fieldRules.minLength) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${fieldRules.minLength} characters`;
    }

    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be less than ${fieldRules.maxLength} characters`;
    }

    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is invalid`;
    }

    if (fieldRules.custom) {
        return fieldRules.custom(value);
    }

    return null;
};

export const validateForm = (
    formData: { [key: string]: string },
    rules: ValidationRules
): ValidationErrors => {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName] || '', rules);
        if (error) {
            errors[fieldName] = error;
        }
    });

    return errors;
};

// Specific field validators
export const validateEmail: EmailValidator = (email: string): string | null => {
    if (!email.trim()) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Email is invalid';
    return null;
};

export const validatePassword: PasswordValidator = (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
};

export const validateName: NameValidator = (name: string): string | null => {
    if (!name.trim()) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 50) return 'Name must be less than 50 characters';
    return null;
};

export const validateSurname: NameValidator = (surname: string): string | null => {
    if (!surname.trim()) return 'Last name is required';
    if (surname.length < 2) return 'Last name must be at least 2 characters';
    if (surname.length > 50) return 'Last name must be less than 50 characters';
    return null;
};

export const validatePhone = (phone: string): string | null => {
    if (!phone.trim()) return 'Phone number is required';
    // Basic phone validation - allows international numbers
    const cleanedPhone = phone.replace(/[\s\-()]/g, '');
    if (!/^\+?[1-9]\d{1,14}$/.test(cleanedPhone)) {
        return 'Please enter a valid phone number';
    }
    return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
};

// Complete form validators
export const validateLoginForm = (formData: AuthFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    const emailError = validateEmail(formData.email || '');
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(formData.password || '');
    if (passwordError) errors.password = passwordError;

    return errors;
};

export const validateRegistrationForm = (formData: AuthFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    const nameError = validateName(formData.name || '');
    if (nameError) errors.name = nameError;

    const surnameError = validateSurname(formData.surname || '');
    if (surnameError) errors.surname = surnameError;

    const phoneError = validatePhone(formData.cellNumber || '');
    if (phoneError) errors.cellNumber = phoneError;

    const emailError = validateEmail(formData.email || '');
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(formData.password || '');
    if (passwordError) errors.password = passwordError;

    if (formData.password && formData.confirmPassword) {
        const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
        if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    } else if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    }

    return errors;
};

export const validateForgotPasswordForm = (formData: AuthFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    const emailError = validateEmail(formData.email || '');
    if (emailError) errors.email = emailError;

    return errors;
};

// Validation rules
export const loginValidationRules: ValidationRules = {
    email: {
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
    },
    password: {
        required: true,
        minLength: 6,
    },
};

export const registrationValidationRules: ValidationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    surname: {
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    cellNumber: {
        required: true,
        pattern: /^\+?[1-9]\d{1,14}$/,
        custom: validatePhone
    },
    email: {
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
    },
    password: {
        required: true,
        minLength: 6,
    },
    confirmPassword: {
        required: true,
    },
};

export const forgotPasswordValidationRules: ValidationRules = {
    email: {
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
    },
};

// Helper functions
export const isFormValid = (errors: ValidationErrors): boolean => {
    return Object.keys(errors).length === 0;
};

export const clearFieldError = (errors: ValidationErrors, fieldName: string): ValidationErrors => {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    return newErrors;
};

// Shopping list validation
export const validateShoppingItem = (name: string): string | null => {
    if (!name.trim()) return 'Item name is required';
    if (name.length < 2) return 'Item name must be at least 2 characters';
    if (name.length > 100) return 'Item name must be less than 100 characters';
    return null;
};

export const validateQuantity = (quantity: number): string | null => {
    if (quantity <= 0) return 'Quantity must be greater than 0';
    if (quantity > 999) return 'Quantity must be less than 1000';
    return null;
};

export const validateCategory = (category: string): string | null => {
    if (!category.trim()) return 'Category is required';
    if (category.length < 2) return 'Category must be at least 2 characters';
    return null;
};