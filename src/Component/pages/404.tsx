import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <Navbar
                isLoggedIn={false}
                onLogout={() => { }}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => { }}
            />

            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Error Illustration */}
                    <div className="mb-8">
                        <div className="w-32 h-32 mx-auto mb-6 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                            <span className="text-6xl">🔍</span>
                        </div>
                        <h1 className="text-8xl font-bold text-[#5409DA] mb-4">404</h1>
                        <h2 className="text-3xl font-bold text-[#5409DA] mb-4">
                            Page Not Found
                        </h2>
                    </div>

                    {/* Error Message */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
                        <p className="text-lg text-[#4E71FF] mb-2">
                            Oops! The page you're looking for doesn't exist.
                        </p>
                        <p className="text-[#4E71FF] mb-6">
                            It might have been moved, deleted, or you entered the wrong URL.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={handleGoHome}
                                variant="primary"
                                button_size="medium"
                                className="flex-1 sm:flex-none"
                            >
                                Go Home
                            </Button>
                            <Button
                                onClick={handleGoBack}
                                variant="secondary"
                                button_size="medium"
                                className="flex-1 sm:flex-none"
                            >
                                Go Back
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-[#5409DA] mb-4">
                            Quick Links
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Link
                                to="/shopping"
                                className="block p-3 bg-[#F0F0FF] text-[#5409DA] rounded-lg hover:bg-[#E0E0FF] transition-colors"
                            >
                                Shopping List
                            </Link>
                            <Link
                                to="/auth"
                                className="block p-3 bg-[#F0F0FF] text-[#5409DA] rounded-lg hover:bg-[#E0E0FF] transition-colors"
                            >
                                Login/Register
                            </Link>
                            <Link
                                to="/about"
                                className="block p-3 bg-[#F0F0FF] text-[#5409DA] rounded-lg hover:bg-[#E0E0FF] transition-colors"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contact"
                                className="block p-3 bg-[#F0F0FF] text-[#5409DA] rounded-lg hover:bg-[#E0E0FF] transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center justify-center">
                            <span className="text-yellow-600 text-lg mr-2">💡</span>
                            <p className="text-yellow-700 text-sm">
                                If you believe this is an error, please <Link to="/contact" className="underline font-medium">contact our support team</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFoundPage;