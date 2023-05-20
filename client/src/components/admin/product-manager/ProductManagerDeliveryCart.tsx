import React from 'react';
import styles from '../../../styles/ProductManagerFeatureCart.module.scss';
import Link from 'next/link';

type DeliveryContent = {
    delivery_data: {
        _id: string;
        deliveryAddress: string;
        customerId: string;
        quantity: number;
        totalPrice: number;
        status: string;
        date: string;
        products: Array<{
            productId: string;
            name: string;
            price: number;
            description: string;
            quantity: number;
            _id: string;
        }>;
        __v: number;
        pdfUrl: string;
    };
};

const ProductManagerDeliveryCart = ({ delivery_data }: DeliveryContent) => {
    const handlePdfButtonClick = () => {
        window.open(delivery_data.pdfUrl, '_blank');
    };

    return (
        <div className={styles.cartItem}>
            <Link key={delivery_data._id} href={'/admin/product-manager/deliveries/' + delivery_data._id}>
                <table>
                    <tbody>
                        <tr>
                            <th>Delivery Address:</th>
                            <td>{delivery_data.deliveryAddress}</td>
                        </tr>
                        <tr>
                            <th>Customer ID:</th>
                            <td>{delivery_data.customerId}</td>
                        </tr>
                        <tr>
                            <th>Quantity:</th>
                            <td>{delivery_data.quantity}</td>
                        </tr>
                        <tr>
                            <th>Total Price:</th>
                            <td>{delivery_data.totalPrice}</td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <td>{delivery_data.status}</td>
                        </tr>
                        <tr>
                            <th>Date:</th>
                            <td>{delivery_data.date}</td>
                        </tr>
                        {delivery_data.products.map((product: any) => {
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
                            <th>PDF URL:</th>
                            <td>
                                <button className={styles.pdfButton} onClick={handlePdfButtonClick}>
                                    View PDF
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Link>
        </div>
    );
};

export { ProductManagerDeliveryCart };
