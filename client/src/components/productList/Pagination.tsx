import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        onPageChange(newPage);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <a
                    key={i}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i);
                    }}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${i === currentPage
                            ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                >
                    {i}
                </a>
            );
        }

        return pageNumbers;
    };

    return (
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                }}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {renderPageNumbers()}
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                }}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
        </nav>
    );
};

export default Pagination;
