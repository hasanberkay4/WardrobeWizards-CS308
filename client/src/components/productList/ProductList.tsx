import { useState } from 'react'

// components
import { SortingMenu } from './SortIcon'
import { FilterMenu } from './FilterMenu'
import { Product } from '../../types/productType'
import { ProductListItemView } from './ProductListItem'


const subCategories = [
    { name: 'Tshirts', href: 'products/tshirts' },
    { name: 'Backpacks', href: 'products/bags' },
    { name: 'Sweatshirts', href: 'products/pant' },
    { name: 'Jackets', href: 'products/pant' },
    { name: 'Tanks', href: '#' },
    { name: 'Hats', href: '#' },
]

const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'tshirt', label: 'tshirt', checked: false },
            { value: 'pant', label: 'Beige', checked: false },
            { value: 'Backpacks', label: 'Backpacks', checked: true },
            { value: 'Hats', label: 'Hats', checked: false },
            { value: 'Socks', label: 'Socks', checked: false },
        ],
    },
]

type ProductListProps = {
    products: Array<Product>; // Assuming you have a Product type
};

// type guard
function isKeyOfProduct(key: string): key is keyof Product {
    const productKeys: Array<keyof Product> = [
        '_id', 'name', 'description', 'model', 'number', 'stock_quantity', 'initial_price',
        'category', 'image', 'populariy', 'rating', 'number_of_voters'
    ];
    return productKeys.includes(key as keyof Product);
}

export default function ProductListView({ products }: ProductListProps) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [activeFilters, setActiveFilters] = useState<{ [sectionId: string]: Set<string> }>({});

    const applyFiltersAndSort = (sortOption: string) => {
        let updatedFilteredProducts = products.filter((product) => {
            // Filter products based on the active filters
            for (const sectionId in activeFilters) {
                if (isKeyOfProduct(sectionId) && !activeFilters[sectionId].has(String(product[sectionId]))) {
                    return false;
                }
            }
            return true;
        });

        // Sorting logic
        switch (sortOption) {
            case "Most Popular":
                updatedFilteredProducts.sort((a, b) => b.populariy - a.populariy);
                break;
            case "Best Rating":
                updatedFilteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case "Newest":
                // Implement sorting logic based on the newest products
                // If you have a 'createdAt' property in your Product type:
                // updatedFilteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "Price: Low to High":
                updatedFilteredProducts.sort((a, b) => a.initial_price - b.initial_price);
                break;
            case "Price: High to Low":
                updatedFilteredProducts.sort((a, b) => b.initial_price - a.initial_price);
                break;
            default:
                break;
        }

        setFilteredProducts(updatedFilteredProducts);
    };

    const handleSortOptionSelected = (sortOption: string) => {
        setSelectedSortOption(sortOption);
        applyFiltersAndSort(sortOption);
    };

    const handleFilterChange = (sectionId: string, filterValue: string, isChecked: boolean) => {
        // Update the active filters
        setActiveFilters((prevActiveFilters) => {
            const updatedActiveFilters = { ...prevActiveFilters };
            if (!updatedActiveFilters[sectionId]) {
                updatedActiveFilters[sectionId] = new Set();
            }
            if (isChecked) {
                updatedActiveFilters[sectionId].add(filterValue);
            } else {
                updatedActiveFilters[sectionId].delete(filterValue);
            }
            return updatedActiveFilters;
        });

        applyFiltersAndSort(selectedSortOption);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header: Product - sort */}
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    {/* Header: Products text */}
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>
                    {/* Header: Sorting */}
                    <SortingMenu onSortOptionSelected={handleSortOptionSelected} />
                </div>
                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filter Menu */}
                        <FilterMenu subCategories={subCategories} filters={filters} onFilterChange={handleFilterChange} />

                        {/* Product Grid */}
                        <div className="lg:col-span-3">
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {filteredProducts.map((product) => (
                                    <ProductListItemView key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}