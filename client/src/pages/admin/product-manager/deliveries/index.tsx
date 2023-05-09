import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerDeliveryCart } from "../../../../components/admin/product-manager/ProductManagerDeliveryCart"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"

type ProductManagerDeliveriesPageProps = {
    delivery_array: Array<{
        _id: string,
        deliveryAddress: string,
        customerId: string,
        quantity: number,
        totalPrice: number,
        status: string,
        date: string,
        products: Array<{
            productId: string,
            name: string,
            price: number,
            description: string,
            quantity: number,
            _id: string
        }>
        __v: number,
        pdfUrl: string
    }>
}


const features = ['deliveries', 'products', 'comments'];
const ProductManagerProductsPage = ({ delivery_array }: ProductManagerDeliveriesPageProps) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    {delivery_array.map((data: any) => {
                        return (
                            <div key={data._id}>
                                <ProductManagerDeliveryCart delivery_data={data} />
                            </div>
                        )
                    })}
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProductManagerDeliveriesPageProps> = async () => {

    const response = await fetch(`http://localhost:5001/admin/deliveries`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const delivery_array = await response.json();

    return {
        props: {
            delivery_array: delivery_array.deliveries,
        }
    }
}


export default ProductManagerProductsPage