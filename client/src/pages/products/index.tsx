import { GetServerSideProps } from 'next';
import { Product } from "../../types/products";
import axios, { AxiosResponse } from 'axios';

type Props = {
    products: Product[];
};

export default function ProductsPage({ products }: Props) {
    return (
        <>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req } = context;

    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL('/api/proxy', `${protocol}://${host}`);

    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const products = res.data;

    return {
        props: {
            products,
        },
    };
};
