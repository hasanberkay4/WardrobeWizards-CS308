/* eslint-disable react/jsx-key */
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Product } from '../../types/productType';
import ProductListView from '../../components/productList/ProductList';

type ProductListProps = {
    productList: Product[]
}

export default function ProductsListPage({ productList }: ProductListProps) {

    const [clientSideProductList, setClientSideProductList] = useState<Product[]>([]);

    useEffect(() => { setClientSideProductList(productList) }, [productList]);

    return (
        <>
            {clientSideProductList.length > 0 && (
                <ProductListView key="product-list-view" products={clientSideProductList} />
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