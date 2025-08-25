// task-5-shopping-list-app/src/Components/features/Footer/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-t from-[#4E71FF] to-[#8DD8FF] text-white py-6 md:py-8 mt-auto">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <img
                            src="/Verse_Shoppers-removebg.png"
                            alt="ShopList Pro"
                            className="h-10 w-auto mx-auto md:mx-0 mb-3"
                        />
                        <p className="text-xs md:text-sm opacity-90">Organize your shopping with ease</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full md:w-auto">
                        <div className="text-center md:text-left">
                            <h3 className="text-sm font-semibold mb-2 md:mb-3 uppercase tracking-wide opacity-90">Navigation</h3>
                            <ul className="space-y-1 md:space-y-2">
                                <li><Link to="/" className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors opacity-80 hover:opacity-100">Home</Link></li>
                                <li><Link to="/about" className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors opacity-80 hover:opacity-100">About</Link></li>
                                <li><Link to="/contact" className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors opacity-80 hover:opacity-100">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-sm font-semibold mb-2 md:mb-3 uppercase tracking-wide opacity-90">Features</h3>
                            <ul className="space-y-1 md:space-y-2">
                                <li><span className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors cursor-pointer opacity-80 hover:opacity-100">My Lists</span></li>
                                <li><span className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors cursor-pointer opacity-80 hover:opacity-100">Categories</span></li>
                                <li><span className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors cursor-pointer opacity-80 hover:opacity-100">Favorites</span></li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-sm font-semibold mb-2 md:mb-3 uppercase tracking-wide opacity-90">Connect</h3>
                            <ul className="space-y-1 md:space-y-2">
                                <li><span className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors cursor-pointer opacity-80 hover:opacity-100">Support</span></li>
                                <li><span className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors cursor-pointer opacity-80 hover:opacity-100">Feedback</span></li>
                                <li><span className="text-xs md:text-sm hover:text-[#BBFBFF] transition-colors cursor-pointer opacity-80 hover:opacity-100">Community</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-6 pt-4 text-center">
                    <p className="text-xs opacity-75">
                        &copy; {new Date().getFullYear()} ShopList Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;