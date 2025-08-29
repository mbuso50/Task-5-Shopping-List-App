// src/Component/pages/Favorites-page.tsx
import React from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';

const FavoritesPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <Navbar isLoggedIn={true} onLogout={() => { }} mobileMenuOpen={false} setMobileMenuOpen={() => { }} />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-white mb-8">Favorites</h1>
                <p className="text-center text-white">Your favorite items will appear here.</p>
            </main>
            <Footer />
        </div>
    );
};

export default FavoritesPage;