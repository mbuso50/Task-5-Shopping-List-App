import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { fetchProfile } from '../slices/profileSlice';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';
import Profile from '../Profiling/Profiles/Profile';

const ProfilePage: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
        } else {
            dispatch(fetchProfile());
        }
    }, [isAuthenticated, navigate, dispatch]);

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
                <Profile />
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;