import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSearchTerm, clearFilters } from '../slices/shoppingListSlice';

const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { searchTerm } = useAppSelector((state) => state.shoppingLists.filters);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleClearSearch = () => {
        dispatch(setSearchTerm(''));
    };

    const handleClearAllFilters = () => {
        dispatch(clearFilters());
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                    <label htmlFor="search" className="block text-sm font-medium text-[#5409DA] mb-1">
                        Search Items
                    </label>
                    <div className="relative">
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by name, category, or notes..."
                            className="w-full px-4 py-2 pl-10 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        {searchTerm && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {(searchTerm) && (
                    <div className="flex items-end">
                        <button
                            onClick={handleClearAllFilters}
                            className="px-4 py-2 text-sm text-[#4E71FF] hover:text-[#5409DA] border border-[#8DD8FF] rounded-lg hover:border-[#5409DA] transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {searchTerm && (
                <div className="mt-3 text-sm text-[#4E71FF]">
                    <p>Searching for: "<span className="font-semibold">{searchTerm}</span>"</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;