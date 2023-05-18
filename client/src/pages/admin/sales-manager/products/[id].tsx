import { GetServerSideProps } from "next"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout"

type SalesManagerProductPageProps = {
    product_info: {
        _id: string,
        name: string,
        initial_price: number,
        image: string,
        category_ids: Array<string>
    }
}


const features = ['deliveries', 'products', 'comments'];
const SalesManagerProductsPage = ({ product_info }: SalesManagerProductPageProps) => {

    return (
        <div>
            <AdminLayout>
                <SalesManagerLayout>
                    <h1> Product Info: {product_info._id} </h1>
                    <p> Name: {product_info.name} </p>
                    <p> Initial Price: {product_info.initial_price} </p>
                    <p> Category Ids: {product_info.category_ids} </p>
                   
                </SalesManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<SalesManagerProductPageProps> = async (context) => {
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


export default SalesManagerProductsPage