import { GetServerSideProps } from 'next';
import { Product } from "../../types/productTypes";
import axios, { AxiosResponse } from 'axios';
import Filter from '../../components/productList/ProductListView';
import ProductListView from '../../components/landing/CategoryListView';

type Props = {
    products: Product[];
};

export default function ProductsPage({ products }: Props) {
    const productUrl = "http://localhost:5001/products/id/"

    return (
        <>
            <Filter />
            <ProductListView />
        </>

    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req } = context;

    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent(`http://localhost:5001/products/`);

    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);

    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const products = res.data;

    return {
        props: {
            products,
        },
    };
};
