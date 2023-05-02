// SearchBar.tsx
import React, { useState, FormEvent } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchBarProps {
    onSubmit: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(searchTerm);
    };

    return (

        <form className="flex lg:ml-6" onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search..."
                className="p-2 text-gray-400 hover:text-gray-500"
            />
            <button type="submit"></button>
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        </form>
    );
};

export default SearchBar;
