import React, { useState } from 'react';
import type { ProfileSectionProps } from '../../types/Types';

const ProfileDetails: React.FC<ProfileSectionProps> = ({ profile, onUpdateProfile }) => {
    const [formData, setFormData] = useState({
        name: profile.name || '',
        surname: profile.surname || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        cellNumber: profile.cellNumber || ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        onUpdateProfile(formData);
    };

    // Safe date formatting function
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return 'Invalid date';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-[#5409DA] mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        placeholder="Enter your first name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#5409DA] mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        value={formData.surname || ''}
                        onChange={(e) => handleInputChange('surname', e.target.value)}
                        className="w-full px-4 py-3 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        placeholder="Enter your last name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#5409DA] mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#5409DA] mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={formData.phone || formData.cellNumber || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#5409DA] mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        value={formData.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        placeholder="Enter your address"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-[#5409DA] text-white px-6 py-3 rounded-lg hover:bg-[#4507B5] transition-colors"
                >
                    Save Changes
                </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-green-700 text-sm">
                        Your changes will be saved to the server.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0]">
                <div>
                    <h4 className="font-semibold text-[#5409DA]">Account Created</h4>
                    <p className="text-[#4E71FF] text-sm">
                        {formatDate(profile.createdAt)}
                    </p>
                </div>

                {profile.lastLogin && (
                    <div>
                        <h4 className="font-semibold text-[#5409DA]">Last Login</h4>
                        <p className="text-[#4E71FF] text-sm">
                            {formatDate(profile.lastLogin)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileDetails;