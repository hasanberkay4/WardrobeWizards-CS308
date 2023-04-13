import { GetServerSideProps } from 'next';
import { Product } from "../../types/products";

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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const res = await fetch('https://localhost:3001/products');
    const products = await res.json();
    return {
        props: {
            products,
        },
    };
};
