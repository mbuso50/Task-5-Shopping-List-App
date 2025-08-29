import React from 'react';
import type { ProfileSidebarProps } from '../../types/Types';

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
    activeSection,
    onSectionChange
}) => {
    const menuItems = [
        { id: 'details', label: 'Profile Details', icon: '👤' },
        { id: 'settings', label: 'Preferences', icon: '⚙️' },
        { id: 'security', label: 'Security', icon: '🔒' }
    ];

    return (
        <div className="lg:w-64 bg-[#F8FAFC] border-r border-[#E2E8F0] p-6">
            <div className="space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSectionChange(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${activeSection === item.id
                            ? 'bg-[#5409DA] text-white shadow-lg'
                            : 'text-[#5409DA] hover:bg-[#F0F0FF] hover:text-[#4507B5]'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* User info section */}
            <div className="mt-8 p-4 bg-white rounded-lg border border-[#E2E8F0]">
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#5409DA] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl text-white">👤</span>
                    </div>
                    <h3 className="font-semibold text-[#5409DA]">Your Account</h3>
                    <p className="text-sm text-[#4E71FF] mt-1">
                        All changes are saved automatically
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;