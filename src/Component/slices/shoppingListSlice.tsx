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
    filters: {
        searchTerm: string;
        categoryFilter: string;
        sortBy: string;
    };
}

const initialState: ShoppingListState = {
    items: [],
    isLoading: false,
    error: null,
    filters: {
        searchTerm: '',
        categoryFilter: 'all',
        sortBy: 'name-asc'
    },
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

export const updateShoppingItem = createAsyncThunk(
    'shoppingLists/updateItem',
    async ({ id, updates }: { id: string; updates: Partial<ShoppingItem> }, { rejectWithValue }) => {
        try {
            const response = await updateShoppingListItem(id, updates);
            return response;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update item';
            return rejectWithValue(errorMessage);
        }
    }
);

export const toggleItemCompleted = createAsyncThunk(
    'shoppingLists/toggleCompleted',
    async (id: string, { rejectWithValue }) => {
        try {
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
        updateItemLocal: (state, action: PayloadAction<{ id: string; updates: Partial<ShoppingItem> }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                Object.assign(item, action.payload.updates);
            }
        },
        clearCompletedLocal: (state) => {
            state.items = state.items.filter(item => !item.completed);
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.filters.searchTerm = action.payload;
        },
        setCategoryFilter: (state, action: PayloadAction<string>) => {
            state.filters.categoryFilter = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.filters.sortBy = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {
                searchTerm: '',
                categoryFilter: 'all',
                sortBy: 'name-asc'
            };
        },
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(addShoppingItem.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                state.items.push(action.payload);
            })
            .addCase(addShoppingItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateItemQuantity.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateShoppingItem.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateShoppingItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(toggleItemCompleted.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(removeShoppingItem.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    },
});

export const {
    clearError,
    toggleItemLocal,
    updateItemQuantityLocal,
    clearCompletedLocal,
    updateItemLocal,
    setSearchTerm,
    setCategoryFilter,
    setSortBy,
    clearFilters
} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;