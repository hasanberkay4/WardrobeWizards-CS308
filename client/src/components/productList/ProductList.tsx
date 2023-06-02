import { useState } from 'react'

// components
import { SortingMenu } from './SortIcon'
import { FilterMenu } from './FilterMenu'
import { Product } from '../../types/productType'
import { ProductListItemView } from './ProductListItem'
import Pagination from './Pagination'


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
    products: Array<Product>;
};


function ProductListView({ products }: ProductListProps) {

    // Filter state
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter logic
    const handleFilterChange = async (filterValue: string) => {
        try {
            if (filterValue === "") {
                setFilteredProducts(products);
                return;
            }
            const filterResult = await fetch(`http://localhost:5001/products/filter?category=${filterValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const filterResultJson = await filterResult.json();

            console.log(filterResultJson);


            filterResultJson.map((product: { image: string }) => {
                const imageUrl = product.image;
                product.image = imageUrl;
            });


            setFilteredProducts(filterResultJson);


        } catch (error) {
            console.log(error);
        }
    }

    // Sorting logic
    const handleSortChange = (sortValue: string) => {
        try {
            let updatedFilteredProducts = [...filteredProducts];
            switch (sortValue) {
                case "Most Popular":
                    updatedFilteredProducts.sort((a, b) => b.popularity - a.popularity);
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
        } catch (error) {
            console.log(error);
        }
    }

    // Pagination logic
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Render logic
    const renderProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const displayedItems = filteredProducts.slice(startIndex, endIndex);


        return displayedItems.map((product) => (
            <ProductListItemView key={product._id} product={product} />
        ));
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header: Product - sort */}
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    {/* Header: Products text */}
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>
                    {/* Header: Sorting */}
                    <SortingMenu onSortOptionSelected={handleSortChange} />
                </div>
                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filter Menu */}
                        <FilterMenu onFilterChange={handleFilterChange} />

                        {/* Product Grid */}
                        <div className="lg:col-span-3">
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                    {/* Pagination */}
                    <Pagination
                        totalItems={filteredProducts.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </section>
            </div>
        </div>
    )
}

export default ProductListView;