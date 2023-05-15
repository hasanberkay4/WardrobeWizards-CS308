// SearchBar.tsx
import React, { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Product } from "../../../types/productType";
import { handleSearchSubmit } from "../../../scripts/products/search";
import router from "next/router";


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const searchQuery = encodeURIComponent(searchTerm);
        router.push(`/products?q=${searchQuery}`);
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
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" style={{ marginTop: '6px' }} />
        </form>
    );
};

export default SearchBar;
