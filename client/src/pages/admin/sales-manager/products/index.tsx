import { GetServerSideProps } from "next"
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout"
import { SalesManagerProducts } from "../../../../components/admin/sales-manager/SalesManagerProducts"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import { Product } from "../../../../types/productType"

type SalesManagerProductsPageProps = {
    product_array: Array<{
        _id: string,
        name: string,
        initial_price: number,
        image: any,
        category_ids: Array<string>
    }>
}


const features = ['deliveries', 'products', 'comments'];
const SalesManagerProductsPage = ({ product_array }: SalesManagerProductsPageProps) => {

    return (
        <div>
            <AdminLayout>
                <SalesManagerLayout>
                    {product_array.map((data: any) => {
                        return (
                            <div key={data._id}>
                                <SalesManagerProducts product_data={data} />
                            </div>
                        )
                    })}
                </SalesManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<SalesManagerProductsPageProps> = async () => {

    const response = await fetch(`http://localhost:5001/admin/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const product_array = await response.json();

    product_array.products = product_array.products.map((product: Product) => {
        const productName = product.image;
        // product.image =  `http://localhost:5001/images/${productName}`; // replace this with your default image path

        return product;
    });


    return {
        props: {
            product_array: product_array.products,
        }
    }
}


export default SalesManagerProductsPage