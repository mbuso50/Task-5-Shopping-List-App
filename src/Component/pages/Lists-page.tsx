// ListsPage component with theme alignment
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';

interface ShoppingList {
    id: number;
    name: string;
    date: string;
    items: string[];
}

const ListsPage: React.FC = () => {
    const navigate = useNavigate();

    // Demo shopping lists data
    const shoppingLists: ShoppingList[] = [
        {
            id: 1,
            name: 'Weekly Groceries',
            date: new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            items: ['Milk', 'Eggs', 'Bread', 'Fruits', 'Vegetables']
        },
        {
            id: 2,
            name: 'Party Supplies',
            date: new Date(Date.now() + 86400000).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            items: ['Chips', 'Drinks', 'Paper plates', 'Napkins', 'Cups']
        }
    ];

    const handleEditClick = (listId: number) => {
        navigate(`/shopping?edit=${listId}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
            <Navbar isLoggedIn={true} onLogout={() => { }} mobileMenuOpen={false} setMobileMenuOpen={() => { }} />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-white mb-8">My Shopping Lists</h1>

                <div className="max-w-4xl mx-auto">
                    {shoppingLists.map((list) => (
                        <div key={list.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#5409DA]">{list.name}</h2>
                                    <p className="text-[#4E71FF]">{list.date}</p>
                                </div>
                                <button
                                    onClick={() => handleEditClick(list.id)}
                                    className="bg-[#5409DA] hover:bg-[#4507B5] text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Edit List
                                </button>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-semibold text-[#5409DA] mb-3">Items:</h3>
                                <ul className="space-y-2">
                                    {list.items.map((item, index) => (
                                        <li key={index} className="text-[#4E71FF] bg-gray-50/50 px-4 py-2 rounded-lg">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    {shoppingLists.length === 0 && (
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center">
                            <p className="text-lg text-[#5409DA] mb-2">No shopping lists found.</p>
                            <p className="text-[#4E71FF]">Create your first shopping list to get started!</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ListsPage;