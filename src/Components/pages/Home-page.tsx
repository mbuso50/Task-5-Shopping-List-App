// task-5-shopping-list-app/src/Components/pages/Home-page.tsx
import React, { useState } from 'react';
import Navbar from '../features/NavBar/Navbar';
import WelcomeComponent from '../features/welcome_component/Welcome-component';
import Footer from '../features/Footer/Footer';

const HomePage: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        console.log('User logged in');
    };

    const handleSignUp = () => {
        console.log('Redirect to sign up page');
    };

    const handleCreateList = () => {
        console.log('Create new list');
    };

    const handleSeeDemo = () => {
        console.log('Show demo');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log('User logged out');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <Navbar
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <main className="flex-1 flex flex-col">
                <WelcomeComponent
                    onLogin={handleLogin}
                    onSignUp={handleSignUp}
                    onCreateList={handleCreateList}
                    onSeeDemo={handleSeeDemo}
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                />
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;