import type { ShoppingItem, CreateShoppingListItemDto } from '../types/Types';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchShoppingLists = async (): Promise<ShoppingItem[]> => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        // First, try to get the user's shopping lists
        const listsResponse = await fetch(`${API_BASE_URL}/shoppingLists?userId=${user.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!listsResponse.ok) {
            throw new Error(`Failed to fetch shopping lists: ${listsResponse.status} ${listsResponse.statusText}`);
        }

        const lists = await listsResponse.json();

        // If no lists found, create a default one
        if (lists.length === 0) {
            const defaultList = {
                userId: user.id,
                name: "My Shopping List",
                createdAt: new Date().toISOString()
            };

            const createListResponse = await fetch(`${API_BASE_URL}/shoppingLists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(defaultList),
            });

            if (!createListResponse.ok) {
                throw new Error('Failed to create default shopping list');
            }

            const newList = await createListResponse.json();
            return [newList];
        }

        return lists;
    } catch (error) {
        console.error('Error fetching shopping lists:', error);
        throw error;
    }
};

export const fetchShoppingListItems = async (listId: string): Promise<ShoppingItem[]> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        console.log('Fetching shopping list items for list ID:', listId);

        // Try the main endpoint - your db.json shows shoppingListItems array
        const response = await fetch(`${API_BASE_URL}/shoppingListItems?shoppingListId=${listId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            // If shoppingListItems endpoint doesn't work, try getting items from the list itself
            const listResponse = await fetch(`${API_BASE_URL}/shoppingLists/${listId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!listResponse.ok) {
                throw new Error(`Failed to fetch shopping list items: ${response.status} ${response.statusText}`);
            }

            const list = await listResponse.json();
            // If the list has items embedded, return them
            return list.items || [];
        }

        const data = await response.json();
        console.log('Fetched items:', data);
        return data;
    } catch (error) {
        console.error('Error fetching shopping list items:', error);
        throw error;
    }
};

export const createShoppingListItem = async (itemData: CreateShoppingListItemDto): Promise<ShoppingItem> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        // First try the shoppingListItems endpoint
        const response = await fetch(`${API_BASE_URL}/shoppingListItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...itemData,
                shoppingListId: '1', // Default list ID for now
                completed: false,
                createdAt: new Date().toISOString(),
            }),
        });

        // If shoppingListItems endpoint doesn't exist (404), try adding to the list directly
        if (response.status === 404) {
            console.log('shoppingListItems endpoint not found, trying alternative approach');

            // Get the current list
            const listResponse = await fetch(`${API_BASE_URL}/shoppingLists/1`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!listResponse.ok) {
                throw new Error('Failed to fetch shopping list');
            }

            const list = await listResponse.json();

            // Create new item with shoppingListId
            const newItem: ShoppingItem = {
                ...itemData,
                id: Date.now().toString(),
                shoppingListId: '1', // Add the missing shoppingListId
                completed: false,
                createdAt: new Date().toISOString(),
            };

            // Update the list with the new item
            const updatedList = {
                ...list,
                items: [...(list.items || []), newItem]
            };

            const updateResponse = await fetch(`${API_BASE_URL}/shoppingLists/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedList),
            });

            if (!updateResponse.ok) {
                throw new Error(`Failed to create shopping list item: ${updateResponse.status} ${updateResponse.statusText}`);
            }

            return newItem;
        } else if (!response.ok) {
            throw new Error(`Failed to create shopping list item: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error creating shopping list item:', error);
        throw error;
    }
};

export const updateShoppingListItem = async (id: string, updates: Partial<ShoppingItem>): Promise<ShoppingItem> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/shoppingListItems/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
        });

        // Fallback if shoppingListItems endpoint doesn't exist
        if (response.status === 404) {
            // Implement fallback logic similar to createShoppingListItem
            console.log('Update fallback not implemented yet');
            throw new Error('shoppingListItems endpoint not available');
        }

        if (!response.ok) {
            throw new Error(`Failed to update shopping list item: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error updating shopping list item:', error);
        throw error;
    }
};

export const deleteShoppingListItem = async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/shoppingListItems/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Fallback if shoppingListItems endpoint doesn't exist
        if (response.status === 404) {
            console.log('Delete fallback not implemented yet');
            throw new Error('shoppingListItems endpoint not available');
        }

        if (!response.ok) {
            throw new Error(`Failed to delete shopping list item: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting shopping list item:', error);
        throw error;
    }
};