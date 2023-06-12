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

    // Add useRouter hook
    const router = useRouter();

    useEffect(() => {

        if (router.query.q) {

            const searchTerm = decodeURIComponent(router.query.q as string);
            const searchedProducts = handleSearchSubmit(searchTerm).then((res) => {
                if (res) {
                    setClientSideProductList(res);
                }
            });

        } else {
            setClientSideProductList(productList)
        }
    }, [productList, router.query.q]);



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



    return {
        props: {
            productList,
        },
    };
};