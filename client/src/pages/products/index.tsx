/* eslint-disable react/jsx-key */
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Product } from '../../types/productType';
import ProductListView from '../../components/productList/ProductList';
import { useRouter } from 'next/router';
import { handleSearchSubmit } from '../../scripts/products/search';

type ProductListProps = {
    productList: Product[]
}

export default function ProductsListPage({ productList }: ProductListProps) {

    const [clientSideProductList, setClientSideProductList] = useState<Product[]>([]);

    useEffect(() => { setClientSideProductList(productList) }, [productList]);

    // Add useRouter hook
    const router = useRouter();

    // Add useEffect hook to update filteredProducts state when searchResults change
    const fetchData = async () => {
        if (router.query.q) {
            const searchTerm = decodeURIComponent(router.query.q as string);
            const searchedProducts = await handleSearchSubmit(searchTerm);
            if (searchedProducts) {
                setClientSideProductList(searchedProducts);
            }
        }
    };
    useEffect(() => { fetchData(); }, [router.query.q]);

    return (
        <>
            {clientSideProductList.length > 0 && (
                <ProductListView key={JSON.stringify(clientSideProductList)} products={clientSideProductList} />
            )}
        </>
    );
}

export const getServerSideProps: GetServerSideProps<ProductListProps> = async (context) => {

    const result = await fetch('http://localhost:5001/products/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const productList = await result.json();

    productList.map((product: Product) => {
        const productName = product.image;
        product.image = `http://localhost:5001/images/${productName}`
    });

    return {
        props: {
            productList,
        },
    };
};