import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerDeliveryCart } from "../../../../components/admin/product-manager/ProductManagerDeliveryCart"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"

type ProductManagerDeliveryPageProps = {
    delivery_info: {
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
    }
}


const features = ['deliveries', 'products', 'comments'];
const ProductManagerProductsPage = ({ delivery_info }: ProductManagerDeliveryPageProps) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    <h1> Delivery Info: {delivery_info._id} </h1>
                    <p> Delivery Address: {delivery_info.deliveryAddress} </p>
                    <p> Customer Id: {delivery_info.customerId} </p>
                    <p> Quantity: {delivery_info.quantity} </p>
                    <p> Total Price: {delivery_info.totalPrice} </p>
                    <p> Status: {delivery_info.status} </p>
                    <p> Date: {delivery_info.date} </p>
                    <br />
                    <p> Products: </p>
                    {delivery_info.products.map((product) => {
                        return (
                            <div key={product._id}>
                                <h3> Product Id:{product.productId} </h3>
                                <p> Name: {product.name} </p>
                                <p> Price: {product.price} </p>
                                <p> Description: {product.description} </p>
                                <p> Quantity:{product.quantity} </p>
                            </div>
                        )
                    })}
                    <p> __v: {delivery_info.__v} </p>
                    <p> pdfUrl: {delivery_info.pdfUrl} </p>
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProductManagerDeliveryPageProps> = async (context) => {
    const id = context.params?.id ?? '';

    const response = await fetch(`http://localhost:5001/admin/deliveries/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const delivery_info = await response.json();

    return {
        props: {
            delivery_info: delivery_info.delivery,
        }
    }
}


export default ProductManagerProductsPage