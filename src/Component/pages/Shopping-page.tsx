// src/Component/pages/Shopping-page.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import ShoppingListGrid from '../Shopping-list/Shopping-list';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';

const ShoppingPage: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        navigate('/');
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <Navbar
                isLoggedIn={true}
                onLogout={handleLogout}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => { }}
            />
            <main className="flex-1">
                <ShoppingListGrid />
            </main>
            <Footer />
        </div>
    );
};

export default ShoppingPage;