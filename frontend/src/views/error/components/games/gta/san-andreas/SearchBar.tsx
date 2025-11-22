import React from 'react';
import Spinner from './Spinner';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
    return (
        <div className="relative mb-6">
            <input
                type="search"
                name="q"
                placeholder="Search by effect or code (e.g., 'jetpack', 'hesoyam')..."
                autoComplete="off"
                onChange={(e) => onSearch(e.target.value)}
                className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default SearchBar;