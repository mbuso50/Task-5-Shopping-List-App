import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    fetchShoppingListItems,
    createShoppingListItem,
    updateShoppingListItem,
    deleteShoppingListItem
} from '../api/shoppingListApi';
import type { ShoppingItem, CreateShoppingListItemDto } from '../types/Types';

interface ShoppingListState {
    items: ShoppingItem[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ShoppingListState = {
    items: [],
    isLoading: false,
    error: null,
};

export const loadShoppingListItems = createAsyncThunk(
    'shoppingLists/loadItems',
    async (listId: string, { rejectWithValue }) => {
        try {
            const response = await fetchShoppingListItems(listId);
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to load items';
            return rejectWithValue(errorMessage);
        }
    }
);

export const addShoppingItem = createAsyncThunk(
    'shoppingLists/addItem',
    async (itemData: CreateShoppingListItemDto, { rejectWithValue }) => {
        try {
            const response = await createShoppingListItem(itemData);
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to add item';
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateItemQuantity = createAsyncThunk(
    'shoppingLists/updateQuantity',
    async ({ id, quantity }: { id: string; quantity: number }, { rejectWithValue }) => {
        try {
            const response = await updateShoppingListItem(id, { quantity });
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update quantity';
            return rejectWithValue(errorMessage);
        }
    }
);

export const toggleItemCompleted = createAsyncThunk(
    'shoppingLists/toggleCompleted',
    async (id: string, { rejectWithValue }) => {
        try {
            // First get the current item to toggle the completed status
            const items = await fetchShoppingListItems('1'); // Default list ID
            const item = items.find(item => item.id === id);

            if (!item) {
                throw new Error('Item not found');
            }

            const response = await updateShoppingListItem(id, { completed: !item.completed });
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to toggle item';
            return rejectWithValue(errorMessage);
        }
    }
);

export const removeShoppingItem = createAsyncThunk(
    'shoppingLists/removeItem',
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteShoppingListItem(id);
            return id;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to remove item';
            return rejectWithValue(errorMessage);
        }
    }
);

const shoppingListSlice = createSlice({
    name: 'shoppingLists',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        // Local state updates for immediate UI feedback
        toggleItemLocal: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.completed = !item.completed;
            }
        },
        updateItemQuantityLocal: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCompletedLocal: (state) => {
            state.items = state.items.filter(item => !item.completed);
        },
    },
    extraReducers: (builder) => {
        builder
            // Load items
            .addCase(loadShoppingListItems.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadShoppingListItems.fulfilled, (state, action: PayloadAction<ShoppingItem[]>) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(loadShoppingListItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Add item
            .addCase(addShoppingItem.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                state.items.push(action.payload);
            })
            .addCase(addShoppingItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Update quantity
            .addCase(updateItemQuantity.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Toggle completed
            .addCase(toggleItemCompleted.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Remove item
            .addCase(removeShoppingItem.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    },
});

export const { clearError, toggleItemLocal, updateItemQuantityLocal, clearCompletedLocal } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;