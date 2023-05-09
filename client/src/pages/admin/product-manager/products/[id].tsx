import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"

type ProductManagerProductPageProps = {
    product_info: {
        _id: string,
        name: string,
        initial_price: number,
        category_ids: Array<string>
    }
}


const features = ['deliveries', 'products', 'comments'];
const ProductManagerProductsPage = ({ product_info }: ProductManagerProductPageProps) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    <h1> Product Info: {product_info._id} </h1>
                    <p> Name: {product_info.name} </p>
                    <p> Initial Price: {product_info.initial_price} </p>
                    <p> Category Ids: {product_info.category_ids} </p>
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProductManagerProductPageProps> = async (context) => {
    const id = context.params?.id ?? '';

    const response = await fetch(`http://localhost:5001/admin/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const product_info = await response.json();

    return {
        props: {
            product_info: product_info.product,
        }
    }
}


export default ProductManagerProductsPage