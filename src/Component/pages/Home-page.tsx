// src/Components/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import WelcomeComponent from '../welcome_component/Welcome-component';
import DemoComponent from '../Shopping-list/Demo-component';
import Footer from '../Footer/Footer';
import type { AppPage } from '../types/Types';

const HomePage: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState<AppPage>('home');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentPage('home');
        console.log('User logged out');
    };

    const handleBackToHome = () => {
        setCurrentPage('home');
    };

    const handleCreateList = () => {
        if (isLoggedIn) {
            navigate('/shopping');
        } else {
            navigate('/auth');
        }
    };

    const handleSeeDemo = () => {
        setCurrentPage('demo');
        console.log('Show demo');
    };

    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate('/shopping');
        } else {
            navigate('/auth');
        }
    };

    const handleLearnMore = () => {
        console.log('Learn more about features');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <Navbar
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                onNavigateHome={handleBackToHome}
            />

            <main className="flex-1 flex flex-col">
                {currentPage === 'home' && (
                    <WelcomeComponent
                        onCreateList={handleCreateList}
                        onSeeDemo={handleSeeDemo}
                        isLoggedIn={isLoggedIn}
                    />
                )}

                {currentPage === 'demo' && (
                    <DemoComponent
                        onGetStarted={handleGetStarted}
                        onLearnMore={handleLearnMore}
                    />
                )}

                {currentPage === 'auth' && !isLoggedIn && (
                    <div className="flex items-center justify-center py-12">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center">
                            <h2 className="text-2xl font-bold text-[#5409DA] mb-4">Authentication Required</h2>
                            <p className="text-[#4E71FF] mb-6">
                                Please log in or sign up to access the shopping list features.
                            </p>
                            <button
                                onClick={handleBackToHome}
                                className="bg-[#5409DA] text-white px-6 py-2 rounded-lg hover:bg-[#4507B5] transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;