/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import styles from '../../../../styles/ProductManagerDeliveryPage.module.scss'
import { useState } from "react"
import React from "react"
import axios from "axios";

type DeliveryProducts = {
    _id: string
    productId: string,
    name: string,
    price: number,
    description: string,
    quantity: number,
    image: string,
}

type DeliveryType = {
    _id: string,
    deliveryAddress: string,
    customerId: string,
    quantity: number,
    totalPrice: number,
    status: string,
    date: string,
    products: Array<DeliveryProducts>,
    __v: number,
    pdfUrl: string
}

export type Props = {
    delivery_info: DeliveryType
}


const ProductManagerDeliveryPage = ({ delivery_info }: Props) => {

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

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        toggleStatus(event.target.value);
        if(event.target.value=="cancelled"){
            
            // for each product in the delivery, decrease the stock count
            delivery_info.products.forEach(async (product: any) => {
                await axios.post(`http://localhost:5001/products/update-stock`, {
                prodId: product.productId,
                stock: product.quantity,
                isIncrease: true,
                });
            });
    
            // add expense
            await axios.post(`http://localhost:5001/transaction/add`, {
                amount: delivery_info.totalPrice,
                type: "expense",
    
            });
            //add the canceled amount to the wallet
    
            await axios.post(`http://localhost:5001/users/user/${delivery_info.customerId}/wallet`, {
                amount: delivery_info.totalPrice
            });

        }
    };

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    <div className={styles.deliveryItem}>
                        <div className={styles.deliveryDetails}>
                            <table className={styles.tableStyle}>
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
                                                    <option value="processing">processing</option>
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

                                    <tr>
                                        <th>PDF URL:</th>
                                        <td>
                                            <div className={styles.viewInvoiceContainer}>
                                                <button
                                                    className={styles.viewInvoiceButton}
                                                    onClick={() => window.open(`http://localhost:5001/products/delivery/invoice/${delivery_info._id}`, "_blank")}
                                                >
                                                    View Invoice
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className={styles.productsContainer}>
                            {/* Products */}
                            {delivery_info.products.map((product) => {
                                return (
                                    <div className={styles.product} key={product._id}>
                                        <img src={product.image} alt={product.name} className={styles.productImage} />
                                        <p>Product ID: {product.productId}</p>
                                        <p>Name: {product.name}</p>
                                        <p>Price: {product.price}</p>
                                        <p>Quantity: {product.quantity}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ProductManagerLayout>
            </AdminLayout>
        </div >
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const id = context.params?.id ?? '';

    const response = await fetch(`http://localhost:5001/admin/deliveries/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const delivery_info = (await response.json()).delivery as DeliveryType;

    // make date readable
    delivery_info.date = new Date(delivery_info.date).toLocaleString();


    return {
        props: {
            delivery_info: delivery_info,
        }
    }
}


export default ProductManagerDeliveryPage