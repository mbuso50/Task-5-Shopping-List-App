// src/Component/NavBar/Navbar.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import type { NavbarProps } from '../types/Types';

const Navbar: React.FC<NavbarProps> = ({
    isLoggedIn,
    onLogout,
    mobileMenuOpen,
    setMobileMenuOpen,
    onNavigateHome
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Default navigation handler if onNavigateHome is not provided
    const handleNavigateHome = () => {
        if (onNavigateHome) {
            onNavigateHome();
        } else {
            navigate('/');
        }
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        onLogout();
        setMobileMenuOpen(false);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    // Check if current page is active for styling
    const isActivePage = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-b from-[#BBFBFF] to-transparent backdrop-blur-sm">
            <nav className="flex items-center justify-between p-4 lg:px-6" aria-label="Global">
                <div className="flex lg:flex-1">
                    <button
                        onClick={handleNavigateHome}
                        className="-m-1.5 p-1.5 flex items-center"
                    >
                        <span className="sr-only">Verse Shoppers</span>
                        <img
                            src="/Verse_Shoppers-removebg.png"
                            alt="Verse Shoppers"
                            className="h-10 w-auto lg:h-12"
                        />
                    </button>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#5409DA]"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    <Link
                        to="/shopping"
                        className={`text-sm font-semibold leading-6 transition-colors ${isActivePage('/shopping')
                            ? 'text-[#5409DA] underline'
                            : 'text-[#ffffff] hover:text-[#4E71FF]'
                            }`}
                    >
                        My Shopping List
                    </Link>
                    <Link
                        to="/lists"
                        className={`text-sm font-semibold leading-6 transition-colors ${isActivePage('/lists')
                            ? 'text-[#5409DA] underline'
                            : 'text-[#ffffff] hover:text-[#4E71FF]'
                            }`}
                    >
                        My Lists
                    </Link>
                    <Link
                        to="/categories"
                        className={`text-sm font-semibold leading-6 transition-colors ${isActivePage('/categories')
                            ? 'text-[#5409DA] underline'
                            : 'text-[#ffffff] hover:text-[#4E71FF]'
                            }`}
                    >
                        Categories
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/profile"
                                className={`text-sm font-semibold leading-6 transition-colors ${isActivePage('/profile')
                                    ? 'text-[#5409DA] underline'
                                    : 'text-[#ffffff] hover:text-[#4E71FF]'
                                    }`}
                            >
                                Profile
                            </Link>
                            <Button
                                variant="secondary"
                                button_size="small"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth?mode=login">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    button_size="small"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/auth?mode=register">
                                <Button
                                    type="button"
                                    variant="primary"
                                    button_size="small"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
                    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleNavigateHome}
                                className="-m-1.5 p-1.5 flex items-center"
                            >
                                <span className="sr-only">Verse Shoppers</span>
                                <img
                                    src="/Verse_Shoppers-removebg.png"
                                    alt="Verse Shoppers"
                                    className="h-8 w-auto"
                                />
                            </button>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <button
                                        onClick={() => handleNavigation('/shopping')}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-left w-full hover:bg-gray-50 ${isActivePage('/shopping') ? 'text-[#5409DA] bg-gray-100' : 'text-gray-900'
                                            }`}
                                    >
                                        My Shopping List
                                    </button>
                                    <button
                                        onClick={() => handleNavigation('/lists')}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-left w-full hover:bg-gray-50 ${isActivePage('/lists') ? 'text-[#5409DA] bg-gray-100' : 'text-gray-900'
                                            }`}
                                    >
                                        My Lists
                                    </button>
                                    <button
                                        onClick={() => handleNavigation('/categories')}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-left w-full hover:bg-gray-50 ${isActivePage('/categories') ? 'text-[#5409DA] bg-gray-100' : 'text-gray-900'
                                            }`}
                                    >
                                        Categories
                                    </button>
                                    {isLoggedIn && (
                                        <button
                                            onClick={() => handleNavigation('/profile')}
                                            className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-left w-full hover:bg-gray-50 ${isActivePage('/profile') ? 'text-[#5409DA] bg-gray-100' : 'text-gray-900'
                                                }`}
                                        >
                                            Profile
                                        </button>
                                    )}
                                </div>
                                <div className="py-6">
                                    {isLoggedIn ? (
                                        <Button
                                            variant="secondary"
                                            button_size="small"
                                            onClick={handleLogout}
                                            className="w-full justify-center"
                                        >
                                            Logout
                                        </Button>
                                    ) : (
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => handleNavigation('/auth?mode=login')}
                                                className="w-full"
                                            >
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    button_size="small"
                                                    className="w-full justify-center"
                                                >
                                                    Login
                                                </Button>
                                            </button>
                                            <button
                                                onClick={() => handleNavigation('/auth?mode=register')}
                                                className="w-full"
                                            >
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    button_size="small"
                                                    className="w-full justify-center"
                                                >
                                                    Sign Up
                                                </Button>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;