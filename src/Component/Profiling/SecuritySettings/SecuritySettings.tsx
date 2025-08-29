import React, { useState } from 'react';
import type { ProfileSectionProps } from '../../types/Types';

const SecuritySettings: React.FC<ProfileSectionProps> = ({ profile }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password change functionality would be implemented here');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };


    console.log('Current profile:', profile);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
                <h3 className="text-lg font-semibold text-[#5409DA] mb-4">Change Password</h3>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#5409DA] mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                            placeholder="Enter current password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#5409DA] mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#5409DA] mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#5409DA] text-white px-6 py-3 rounded-lg hover:bg-[#4507B5] transition-colors"
                    >
                        Update Password
                    </button>
                </form>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">⚠️</span>
                    </div>
                    <p className="text-yellow-700 text-sm">
                        For security reasons, password changes would typically be handled by your authentication server.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
                <h3 className="text-lg font-semibold text-[#5409DA] mb-4">Account Security</h3>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-green-700">Two-Factor Authentication</span>
                        <button className="text-[#5409DA] hover:text-[#4507B5] text-sm font-medium">
                            Enable
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-700">Active Sessions</span>
                        <button className="text-[#5409DA] hover:text-[#4507B5] text-sm font-medium">
                            View All
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-red-700">Delete Account</span>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;