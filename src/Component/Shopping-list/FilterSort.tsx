import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setCategoryFilter, setSortBy } from '../slices/shoppingListSlice';

const FilterSortControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categoryFilter, sortBy } = useAppSelector((state) => state.shoppingLists.filters);

    const categories = ['all', 'Groceries', 'Household', 'Electronics', 'Clothing', 'Other'];
    const sortOptions = [
        { value: 'name-asc', label: 'Name (A-Z)' },
        { value: 'name-desc', label: 'Name (Z-A)' },
        { value: 'category-asc', label: 'Category (A-Z)' },
        { value: 'date-desc', label: 'Newest First' },
        { value: 'date-asc', label: 'Oldest First' }
    ];

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                    <label htmlFor="category-filter" className="block text-sm font-medium text-[#5409DA] mb-1">
                        Filter by Category
                    </label>
                    <select
                        id="category-filter"
                        value={categoryFilter}
                        onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
                        className="w-full px-3 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Options */}
                <div>
                    <label htmlFor="sort-by" className="block text-sm font-medium text-[#5409DA] mb-1">
                        Sort by
                    </label>
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => dispatch(setSortBy(e.target.value))}
                        className="w-full px-3 py-2 border border-[#8DD8FF] rounded-lg focus:ring-2 focus:ring-[#5409DA] focus:border-transparent"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterSortControls;