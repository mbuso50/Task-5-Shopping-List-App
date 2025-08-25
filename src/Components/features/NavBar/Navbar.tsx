// task-5-shopping-list-app/src/Components/features/NavBar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import type { NavbarProps } from '../../types/Types';

const Navbar: React.FC<NavbarProps> = ({
    isLoggedIn,
    onLogout,
    mobileMenuOpen,
    setMobileMenuOpen
}) => {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-b from-[#BBFBFF] to-transparent backdrop-blur-sm">
            <nav className="flex items-center justify-between p-4 lg:px-6" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">ShopList Pro</span>
                        <img
                            src="/Verse_Shoppers-removebg.png"
                            alt="ShopList Pro"
                            className="h-10 w-auto lg:h-12"
                        />
                    </Link>
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
                    <Link to="/lists" className="text-sm font-semibold leading-6 text-[#ffffff] hover:text-[#4E71FF] transition-colors">
                        My Lists
                    </Link>
                    <Link to="/categories" className="text-sm font-semibold leading-6 text-[#ffffff] hover:text-[#4E71FF] transition-colors">
                        Categories
                    </Link>
                    <Link to="/favorites" className="text-sm font-semibold leading-6 text-[#ffffff] hover:text-[#4E71FF] transition-colors">
                        Favorites
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3">
                    {isLoggedIn ? (
                        <Button
                            variant="secondary"
                            button_size="small"
                            onClick={onLogout}
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Link to="/auth/login">
                                <Button
                                    type="Log_in"
                                    variant="secondary"
                                    button_size="small"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/auth">
                                <Button
                                    type="Sign_in"
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

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
                    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">ShopList Pro</span>
                                <img
                                    src="/Verse_Shoppers-removebg.png"
                                    alt="ShopList Pro"
                                    className="h-8 w-auto"
                                />
                            </Link>
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
                                    <Link to="/lists" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                                        My Lists
                                    </Link>
                                    <Link to="/categories" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                                        Categories
                                    </Link>
                                    <Link to="/favorites" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                                        Favorites
                                    </Link>
                                </div>
                                <div className="py-6">
                                    {isLoggedIn ? (
                                        <Button
                                            variant="secondary"
                                            button_size="small"
                                            onClick={() => {
                                                onLogout();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full justify-center"
                                        >
                                            Logout
                                        </Button>
                                    ) : (
                                        <div className="space-y-3">
                                            <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                                                <Button
                                                    type="Log_in"
                                                    variant="secondary"
                                                    button_size="small"
                                                    className="w-full justify-center"
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                                                <Button
                                                    type="Sign_in"
                                                    variant="primary"
                                                    button_size="small"
                                                    className="w-full justify-center"
                                                >
                                                    Sign Up
                                                </Button>
                                            </Link>
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