import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import styles from '../../../../styles/ProductManagerDeliveryPage.module.scss'
import { useState } from "react"
import React from "react"

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
                        <table>
                            <tbody>
                                <tr>
                                    <th>Delivery ID:</th>
                                    <td>{delivery_info._id}</td>
                                </tr>
                                <tr>
                                    <th>Delivery Address:</th>
                                    <td>{delivery_info.deliveryAddress}</td>
                                </tr>
                                <tr>
                                    <th>Customer ID:</th>
                                    <td>{delivery_info.customerId}</td>
                                </tr>
                                <tr>
                                    <th>Quantity:</th>
                                    <td>{delivery_info.quantity}</td>
                                </tr>
                                <tr>
                                    <th>Total Price:</th>
                                    <td>{delivery_info.totalPrice}</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td>
                                        <div className={styles.statusContainer}>
                                            <p>{status}</p>
                                            <select value={status} onChange={handleSelectChange}>
                                                <option value="pending">pending</option>
                                                <option value="delivered">delivered</option>
                                                <option value="cancelled">cancelled</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th>Date:</th>
                                    <td>{delivery_info.date}</td>
                                </tr>
                                {delivery_info.products.map((product: any) => {
                                    return (
                                        <React.Fragment key={product._id}>
                                            <tr>
                                                <th>Product ID:</th>
                                                <td>{product.productId}</td>
                                            </tr>
                                            <tr>
                                                <th>Name:</th>
                                                <td>{product.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Price:</th>
                                                <td>{product.price}</td>
                                            </tr>
                                            <tr>
                                                <th>Description:</th>
                                                <td>{product.description}</td>
                                            </tr>
                                            <tr>
                                                <th>Quantity:</th>
                                                <td>{product.quantity}</td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                                <tr>
                                    <th>Version:</th>
                                    <td>{delivery_info.__v}</td>
                                </tr>
                                <tr>
                                    <th>PDF URL:</th>
                                    <td>
                                        <div className={styles.viewInvoiceContainer}>
                                            <a href={delivery_info.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.viewInvoiceButton}>
                                                View Invoice
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    );
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