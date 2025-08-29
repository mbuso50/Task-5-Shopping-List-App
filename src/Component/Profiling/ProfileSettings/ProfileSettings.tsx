import React from 'react';
import type { ProfileSectionProps } from '../../types/Types';

const ProfileSettings: React.FC<ProfileSectionProps> = ({ profile, onUpdateProfile }) => {
    const handleToggle = (field: keyof typeof profile) => {
        onUpdateProfile({ [field]: !profile[field] });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
                <h3 className="text-lg font-semibold text-[#5409DA] mb-4">Notification Settings</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-[#5409DA]">Enable Notifications</h4>
                            <p className="text-[#4E71FF] text-sm">Receive browser notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={profile.notificationsEnabled}
                                onChange={() => handleToggle('notificationsEnabled')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5409DA]"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-[#5409DA]">Email Notifications</h4>
                            <p className="text-[#4E71FF] text-sm">Receive email updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={profile.emailNotifications}
                                onChange={() => handleToggle('emailNotifications')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5409DA]"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-[#5409DA]">Dark Mode</h4>
                            <p className="text-[#4E71FF] text-sm">Switch to dark theme</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={profile.darkMode}
                                onChange={() => handleToggle('darkMode')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5409DA]"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">💡</span>
                    </div>
                    <p className="text-blue-700 text-sm">
                        These settings are saved automatically and will persist across browser sessions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;