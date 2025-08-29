// src/Component/Shopping-list/Shopping-list.tsx
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
    loadShoppingListItems,
    addShoppingItem,
    toggleItemCompleted,
    updateItemQuantity,
    removeShoppingItem,
    clearCompletedLocal,
    toggleItemLocal,
    updateItemQuantityLocal,
    clearError
} from '../slices/shoppingListSlice';
import Button from '../Button/Button';
import type { ShoppingItem, CreateShoppingListItemDto } from '../types/Types';

interface ShoppingListProps {
    onBackToDemo?: () => void;
    onSaveList?: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ onBackToDemo, onSaveList }) => {
    const dispatch = useAppDispatch();
    const { items, isLoading, error } = useAppSelector((state) => state.shoppingLists);
    const [newItemName, setNewItemName] = useState('');
    const [newItemCategory, setNewItemCategory] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);
    const [showError, setShowError] = useState(false);

    const categories = ['Groceries', 'Household', 'Electronics', 'Clothing', 'Other'];

    useEffect(() => {
        // Load items for the default list (ID: 1)
        dispatch(loadShoppingListItems('1'));
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            setShowError(true);
            // Auto-hide error after 5 seconds
            const timer = setTimeout(() => {
                setShowError(false);
                dispatch(clearError());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleAddItem = () => {
        if (newItemName.trim()) {
            const itemData: CreateShoppingListItemDto = {
                name: newItemName.trim(),
                category: newItemCategory || 'Other',
                quantity: newItemQuantity,
                notes: '',
            };

            dispatch(addShoppingItem(itemData));
            setNewItemName('');
            setNewItemCategory('');
            setNewItemQuantity(1);
        }
    };

    const handleToggleItem = (id: string) => {
        // Update local state immediately for better UX
        dispatch(toggleItemLocal(id));
        // Then update on server
        dispatch(toggleItemCompleted(id));
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        // Update local state immediately
        dispatch(updateItemQuantityLocal({ id, quantity }));
        // Then update on server
        dispatch(updateItemQuantity({ id, quantity }));
    };

    const handleRemoveItem = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(removeShoppingItem(id));
        }
    };

    const handleClearCompleted = () => {
        if (window.confirm('Are you sure you want to clear all completed items?')) {
            dispatch(clearCompletedLocal());
        }
    };

    const handleDismissError = () => {
        setShowError(false);
        dispatch(clearError());
    };

    // Group items by category
    const groupedItems = items.reduce((acc: Record<string, ShoppingItem[]>, item: ShoppingItem) => {
        const category = item.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {} as Record<string, ShoppingItem[]>);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF] py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Error Banner */}
                {showError && error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                        <button
                            onClick={handleDismissError}
                            className="absolute top-0 right-0 p-3"
                        >
                            <span className="text-red-700">×</span>
                        </button>
                    </div>
                )}

                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-[#5409DA] mb-2">My Shopping List</h1>
                            <p className="text-[#4E71FF]">
                                {items.length} item{items.length !== 1 ? 's' : ''} in your list
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {onBackToDemo && (
                                <Button
                                    onClick={onBackToDemo}
                                    variant="secondary"
                                    button_size="medium"
                                >
                                    Back to Demo
                                </Button>
                            )}
                            {onSaveList && (
                                <Button
                                    onClick={onSaveList}
                                    variant="primary"
                                    button_size="medium"
                                >
                                    Save List
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add Item Form */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-6">
                    <h2 className="text-xl font-bold text-[#5409DA] mb-4">Add New Item</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="Enter item name"
                            className="px-4 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                        />
                        <select
                            value={newItemCategory}
                            onChange={(e) => setNewItemCategory(e.target.value)}
                            className="px-4 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        >
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            min="1"
                            value={newItemQuantity}
                            onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
                            className="px-4 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        />
                        <Button
                            onClick={handleAddItem}
                            variant="primary"
                            button_size="medium"
                            className="w-full"
                        >
                            Add Item
                        </Button>
                    </div>
                </div>

                {/* Shopping List Items */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-[#5409DA]">Shopping Items</h2>
                        {items.some(item => item.completed) && (
                            <Button
                                onClick={handleClearCompleted}
                                variant="tertiary"
                                button_size="small"
                            >
                                Clear Completed
                            </Button>
                        )}
                    </div>

                    {Object.keys(groupedItems).length === 0 ? (
                        <div className="text-center py-8 text-[#4E71FF]">
                            <p>Your shopping list is empty. Add some items to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(groupedItems).map(([category, categoryItems]) => (
                                <div key={category}>
                                    <h3 className="font-semibold text-[#5409DA] mb-3 text-lg">{category}</h3>
                                    <div className="space-y-2">
                                        {categoryItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`flex items-center justify-between p-3 rounded-lg border ${item.completed
                                                    ? 'bg-green-50 border-green-200'
                                                    : 'bg-white border-[#8DD8FF]'
                                                    }`}
                                            >
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => handleToggleItem(item.id)}
                                                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${item.completed
                                                            ? 'bg-green-500 border-green-500'
                                                            : 'border-[#5409DA] hover:border-[#4507B5]'
                                                            }`}
                                                    >
                                                        {item.completed && (
                                                            <span className="text-white text-sm">✓</span>
                                                        )}
                                                    </button>
                                                    <span className={item.completed ? 'line-through text-gray-500' : 'text-[#5409DA]'}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            className="w-6 h-6 rounded-full bg-[#8DD8FF] flex items-center justify-center text-white"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 rounded-full bg-[#8DD8FF] flex items-center justify-center text-white"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        variant="tertiary"
                                                        button_size="small"
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;