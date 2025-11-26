import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProfile, updateProfile } from '../../slices/profileSlice';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import SecuritySettings from '../SecuritySettings/SecuritySettings';
import type { ProfileData, UpdateProfileData } from '../../types/Types';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { profile, isLoading, error } = useAppSelector((state) => state.profile);
    const [activeSection, setActiveSection] = useState('details');
    const [localProfile, setLocalProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setLocalProfile(profile);
        }
    }, [profile]);

    const handleUpdateProfile = (updates: UpdateProfileData) => {
        if (localProfile) {
            setLocalProfile(prev => prev ? { ...prev, ...updates } : null);
            dispatch(updateProfile(updates));
        }
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
    };

    const renderActiveSection = () => {
        if (!localProfile) {
            return (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5409DA]"></div>
                </div>
            );
        }

        switch (activeSection) {
            case 'details':
                return <ProfileDetails profile={localProfile} onUpdateProfile={handleUpdateProfile} />;
            case 'settings':
                return <ProfileSettings profile={localProfile} onUpdateProfile={handleUpdateProfile} />;
            case 'security':
                return <SecuritySettings profile={localProfile} onUpdateProfile={handleUpdateProfile} />;
            default:
                return <ProfileDetails profile={localProfile} onUpdateProfile={handleUpdateProfile} />;
        }
    };

    if (isLoading && !localProfile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF] py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        <ProfileSidebar
                            activeSection={activeSection}
                            onSectionChange={handleSectionChange}
                        />

                        <div className="flex-1 p-6 lg:p-8">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-[#5409DA] mb-2">
                                    Profile Settings
                                </h1>
                                <p className="text-[#4E71FF]">
                                    Manage your account settings and preferences
                                </p>
                            </div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                    {error}
                                </div>
                            )}

                            {renderActiveSection()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;