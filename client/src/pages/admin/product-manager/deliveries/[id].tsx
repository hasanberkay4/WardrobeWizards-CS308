import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import styles from '../../../../styles/ProductManagerDeliveryPage.module.scss'
import { useState } from "react"

export type ProductManagerDeliveryPageProps = {
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
const ProductManagerDeliveryPage = ({ delivery_info }: ProductManagerDeliveryPageProps) => {

    const [status, setStatus] = useState(delivery_info.status);

    const toggleStatus = async (newStatus: string) => {
        const response = await fetch(`http://localhost:5001/admin/deliveries/${delivery_info._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            const responseJson = await response.json();
            setStatus(responseJson.delivery.status);
        } else {
            // handle error
            console.error("Error updating delivery status");
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        toggleStatus(event.target.value);
    };

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    <div className={styles.deliveryItem}>
                        <p>{delivery_info._id}</p>
                        <p>{delivery_info.deliveryAddress}</p>
                        <p>{delivery_info.customerId}</p>
                        <p>{delivery_info.quantity}</p>
                        <p>{delivery_info.totalPrice}</p>
                        <p>{status}</p>
                        <div>
                            {/* dropdown for changing delivery status of a product */}
                            <select value={status} onChange={handleSelectChange}>
                                <option value="pending">pending</option>
                                <option value="delivered">delivered</option>
                                <option value="cancelled">cancelled</option>
                            </select>
                        </div>
                        <p>{delivery_info.date}</p>
                        {delivery_info.products.map((product: any) => {
                            return (
                                <div className={styles.product} key={product._id}>
                                    <p>{product._id}</p>
                                    <p>{product.productId}</p>
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                    <p>{product.description}</p>
                                    <p>{product.quantity}</p>
                                </div>
                            )
                        })}

                        <p>{delivery_info.__v}</p>
                        <p>{delivery_info.pdfUrl}</p>
                    </div>
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


export default ProductManagerDeliveryPage