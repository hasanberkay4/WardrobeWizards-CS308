import { GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';
import ProductListView from '../../components/productList/ProductList';
import ProductList from '../../components/productList/ProductList';
import { ProductListItem } from '../../types/productListType';
import ProductListItemView from '../../components/productList/ProductListItem';
import Pagination from '../../components/productList/Pagination';

type ProductListProps = {
    productList: ProductListItem[]
}

export default function ProductsListPage({ productList }: ProductListProps) {
    return (
        <>
            <ProductListView>
                <ProductListItemView />
                <Pagination />
            </ProductListView>
        </>

    )
}

export const getServerSideProps: GetServerSideProps<ProductListProps> = async (context) => {
    const { req } = context;

    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent(`http://localhost:5001/products/`);

    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);

    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const productList = res.data;

    return {
        props: {
            productList,
        },
    };
};
