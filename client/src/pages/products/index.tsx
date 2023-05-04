/* eslint-disable react/jsx-key */
import { GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';
import ProductListView from '../../components/productList/ProductList';
import { Product } from '../../types/productType';
import { useEffect, useState } from 'react';

type ProductListProps = {
    productList: Product[]
}

export default function ProductsListPage({ productList }: ProductListProps) {

    const [clientSideProductList, setClientSideProductList] = useState<Product[]>([]);

    useEffect(() => {
        setClientSideProductList(productList);
    }, [productList]);

    return (
        <>
            {clientSideProductList.length > 0 && (
                <ProductListView key="product-list-view" products={clientSideProductList} />
            )}
        </>
    );

}

export const getServerSideProps: GetServerSideProps<ProductListProps> = async (context) => {
    const { req } = context;

    const result = await fetch('http://localhost:5001/products/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const productList = await result.json();

    productList.map((product: Product) => {
        const productCategory = product.category;
        const productName = product.image;
        product.image = `http://localhost:5001/images/${productName}`
    });

    // old code
    /*
    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent('http://localhost:5001/products/');

    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);

    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const productList = res.data;

    productList.map((product: Product) => {
        const productCategory = product.category;
        const productName = product.image;
        product.image = `http://localhost:5001/images/${productName}`
    })
    */

    return {
        props: {
            productList,
        },
    };
};