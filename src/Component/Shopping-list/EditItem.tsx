import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { updateShoppingItem, updateItemLocal } from '../slices/shoppingListSlice';
import Button from '../Button/Button';
import type { ShoppingItem } from '../types/Types';

interface EditItemModalProps {
    item: ShoppingItem | null;
    isOpen: boolean;
    onClose: () => void;
    categories: string[];
}

const EditItemModal: React.FC<EditItemModalProps> = ({
    item,
    isOpen,
    onClose,
    categories
}) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: 1,
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                category: item.category || '',
                quantity: item.quantity || 1,
                notes: item.notes || ''
            });
        }
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!item) return;

        setIsSubmitting(true);
        try {
            dispatch(updateItemLocal({ id: item.id, updates: formData }));

            await dispatch(updateShoppingItem({
                id: item.id,
                updates: formData
            })).unwrap();

            onClose();
        } catch (error) {
            console.error('Failed to update item:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#5409DA] mb-4">Edit Item</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Item Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            className="w-full px-3 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        >
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                            placeholder="Any additional notes..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="secondary"
                            button_size="medium"
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            button_size="medium"
                            className="flex-1"
                            disabled={isSubmitting || !formData.name.trim()}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Item'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditItemModal;