import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerProductCart } from "../../../../components/admin/product-manager/ProductManagerProductCart"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"

type ProductManagerProductsPageProps = {
    product_array: Array<{
        _id: string,
        name: string,
        initial_price: number,
        category_ids: Array<string>
    }>
}


const features = ['deliveries', 'products', 'comments'];
const ProductManagerProductsPage = ({ product_array }: ProductManagerProductsPageProps) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    {product_array.map((data: any) => {
                        return (
                            <div key={data._id}>
                                <ProductManagerProductCart product_data={data} />
                            </div>
                        )
                    })}
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProductManagerProductsPageProps> = async () => {

    const response = await fetch(`http://localhost:5001/admin/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const product_array = await response.json();

    return {
        props: {
            product_array: product_array.products,
        }
    }
}


export default ProductManagerProductsPage