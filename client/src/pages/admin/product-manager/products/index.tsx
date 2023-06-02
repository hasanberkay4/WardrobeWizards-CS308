import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerProductCart } from "../../../../components/admin/product-manager/ProductManagerProductCart"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import Link from "next/link"
import { Product } from '../../../../types/productType';

type Props = {
    product_array: Product[]
}



const ProductManagerProductsPage = ({ product_array }: Props) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>

                    {/* add product */}
                    <div className="mb-4">
                        <Link href={'/admin/product-manager/products/add-product/'}>
                            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
                                Add Product
                            </button>
                        </Link>
                    </div>

                    {/* add category */}
                    <div className="mb-4">
                        <Link href={'/admin/product-manager/products/add-category/'}>
                            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
                                Add Category
                            </button>
                        </Link>
                    </div>

                    { /* products */}
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

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        // get all products
        const response = await fetch(`http://localhost:5001/admin/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // convert response to json
        const product_response = await response.json();

        // make sure response is of type ProductArrayType
        const product_array = product_response.products as Product[];

        // sort products by initial price
        product_array.sort((a, b) => {
            return a.initial_price - b.initial_price;
        });

        return {
            props: { product_array: product_array }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: { product_array: [] }
        }
    }
}


export default ProductManagerProductsPage