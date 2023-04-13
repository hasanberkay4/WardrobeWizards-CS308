import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Product } from "../../../types/products";

type Props = {
    product: Product;
};

export default function ProductPage({ product }: Props) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <img src={product.imageUrl} alt={product.name} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const productId = context.params?.productId ?? '';
    const res = await fetch(`https://localhost:5001/products/id/${productId}`);
    const product = await res.json();
    return {
        props: {
            product,
        },
    };
};