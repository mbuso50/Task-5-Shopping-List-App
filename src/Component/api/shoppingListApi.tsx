import axiosInstance from './axiosConfig';
import type { ShoppingItem, CreateShoppingListItemDto } from '../types/Types';
import type { AxiosError } from 'axios';
const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            console.warn(' No user found in localStorage');
            return null;
        }
        const user = JSON.parse(userStr);
        console.log(' Current user:', user);
        return user;
    } catch (error) {
        console.error(' Error parsing user from localStorage:', error);
        return null;
    }
};
const getDefaultShoppingList = async (): Promise<string> => {
    try {
        const user = getCurrentUser();
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }

        const response = await axiosInstance.get(`/api/shoppingLists?userId=${user.id}`);
        const userLists = response.data;

        if (userLists && userLists.length > 0) {
            return userLists[0].id;
        }
        const newList = {
            id: Date.now().toString(),
            userId: user.id,
            name: "My Shopping List",
            completed: false,
            category: "Groceries",
            quantity: 1,
            notes: "Default shopping list",
            images: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const createResponse = await axiosInstance.post('/api/shoppingLists', newList);
        return createResponse.data.id;
    } catch (error) {
        console.error(' Error getting default shopping list:', error);
        throw new Error('Failed to get shopping list');
    }
};

export const fetchShoppingLists = async (): Promise<ShoppingItem[]> => {
    try {
        const user = getCurrentUser();
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }

        const response = await axiosInstance.get<ShoppingItem[]>(`/api/shoppingLists?userId=${user.id}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to fetch shopping lists';
        throw new Error(errorMessage);
    }
};

export const fetchShoppingListItems = async (listId: string): Promise<ShoppingItem[]> => {
    try {
        const response = await axiosInstance.get<ShoppingItem[]>(`/api/shoppingListItems?shoppingListId=${listId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to fetch shopping list items';
        throw new Error(errorMessage);
    }
};

export const createShoppingListItem = async (itemData: CreateShoppingListItemDto): Promise<ShoppingItem> => {
    try {
        const user = getCurrentUser();
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }

        const listId = await getDefaultShoppingList();

        const newItem: ShoppingItem = {
            ...itemData,
            id: Date.now().toString(),
            shoppingListId: listId,
            userId: user.id,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const response = await axiosInstance.post<ShoppingItem>('/api/shoppingListItems', newItem);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to create shopping list item';
        throw new Error(errorMessage);
    }
};

export const updateShoppingListItem = async (id: string, updates: Partial<ShoppingItem>): Promise<ShoppingItem> => {
    try {
        const response = await axiosInstance.patch<ShoppingItem>(`/api/shoppingListItems/${id}`, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to update shopping list item';
        throw new Error(errorMessage);
    }
};

export const deleteShoppingListItem = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/shoppingListItems/${id}`);
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to delete shopping list item';
        throw new Error(errorMessage);
    }
};
export const searchShoppingListItems = async (searchTerm: string, listId: string): Promise<ShoppingItem[]> => {
    try {
        const allItems = await fetchShoppingListItems(listId);
        return allItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to search shopping list items';
        throw new Error(errorMessage);
    }
};

export const filterShoppingListItems = async (category: string, listId: string): Promise<ShoppingItem[]> => {
    try {
        const allItems = await fetchShoppingListItems(listId);
        if (!category || category === 'all') {
            return allItems;
        }
        return allItems.filter(item => item.category === category);
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to filter shopping list items';
        throw new Error(errorMessage);
    }
};

export const sortShoppingListItems = async (sortBy: 'name' | 'category' | 'date', listId: string): Promise<ShoppingItem[]> => {
    try {
        const allItems = await fetchShoppingListItems(listId);
        return [...allItems].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'date':
                    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
                default:
                    return 0;
            }
        });
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to sort shopping list items';
        throw new Error(errorMessage);
    }
};