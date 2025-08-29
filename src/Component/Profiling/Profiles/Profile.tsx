import React, { useState, useEffect } from 'react';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import SecuritySettings from '../SecuritySettings/SecuritySettings';
import type { ProfileData } from '../../types/Types';

const Profile: React.FC = () => {
    const [activeSection, setActiveSection] = useState('details');
    const [profile, setProfile] = useState<ProfileData>({
        id: '',
        name: '',
        email: '',
        notificationsEnabled: true,
        darkMode: false,
        emailNotifications: true,
        createdAt: new Date().toISOString()
    });

    // Load profile from localStorage on component mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        } else {
            // Create default profile if none exists
            const defaultProfile: ProfileData = {
                id: Date.now().toString(),
                name: 'Guest User',
                email: 'guest@example.com',
                notificationsEnabled: true,
                darkMode: false,
                emailNotifications: true,
                createdAt: new Date().toISOString()
            };
            setProfile(defaultProfile);
            localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
        }
    }, []);

    // Save profile to localStorage whenever it changes
    useEffect(() => {
        if (profile.id) {
            localStorage.setItem('userProfile', JSON.stringify(profile));
        }
    }, [profile]);

    const handleUpdateProfile = (updates: Partial<ProfileData>) => {
        setProfile(prev => ({ ...prev, ...updates }));
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
    };

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'details':
                return <ProfileDetails profile={profile} onUpdateProfile={handleUpdateProfile} />;
            case 'settings':
                return <ProfileSettings profile={profile} onUpdateProfile={handleUpdateProfile} />;
            case 'security':
                return <SecuritySettings profile={profile} onUpdateProfile={handleUpdateProfile} />;
            default:
                return <ProfileDetails profile={profile} onUpdateProfile={handleUpdateProfile} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF] py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Sidebar */}
                        <ProfileSidebar
                            activeSection={activeSection}
                            onSectionChange={handleSectionChange}
                        />

                        {/* Main Content */}
                        <div className="flex-1 p-6 lg:p-8">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-[#5409DA] mb-2">
                                    Profile Settings
                                </h1>
                                <p className="text-[#4E71FF]">
                                    Manage your account settings and preferences
                                </p>
                            </div>

                            {renderActiveSection()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;