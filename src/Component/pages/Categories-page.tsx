// CategoriesPage component with theme alignment
import React from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';

const CategoriesPage: React.FC = () => {
    // Demo categories data
    const categories = [
        { id: 1, name: 'Fruits & Vegetables', itemCount: 12, color: 'bg-green-100' },
        { id: 2, name: 'Dairy & Eggs', itemCount: 8, color: 'bg-blue-100' },
        { id: 3, name: 'Meat & Seafood', itemCount: 6, color: 'bg-red-100' },
        { id: 4, name: 'Bakery', itemCount: 5, color: 'bg-yellow-100' },
        { id: 5, name: 'Beverages', itemCount: 10, color: 'bg-purple-100' },
        { id: 6, name: 'Snacks', itemCount: 15, color: 'bg-orange-100' }
    ];

    const demoDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <Navbar isLoggedIn={true} onLogout={() => { }} mobileMenuOpen={false} setMobileMenuOpen={() => { }} />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-white mb-8">Categories</h1>

                {/* Date Display */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center mb-8 max-w-md mx-auto">
                    <p className="text-lg font-semibold text-[#5409DA]">Current Date:</p>
                    <p className="text-xl text-[#4E71FF]">{demoDate}</p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                                <span className="text-2xl font-bold text-[#5409DA]">
                                    {category.itemCount}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-[#5409DA] text-center mb-2">
                                {category.name}
                            </h3>
                            <p className="text-[#4E71FF] text-center">
                                {category.itemCount} items
                            </p>
                        </div>
                    ))}
                </div>

                {categories.length === 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center max-w-md mx-auto">
                        <p className="text-lg text-[#5409DA] mb-2">No categories found.</p>
                        <p className="text-[#4E71FF]">Categories will appear here once created.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CategoriesPage;