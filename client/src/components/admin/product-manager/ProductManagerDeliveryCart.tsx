import React from 'react';
import styles from '../../../styles/ProductManagerFeatureCart.module.scss';
import Link from 'next/link';
import { DeliveryType } from '../../../types/adminTypes/deliveryType';
import { useRouter } from 'next/router';

type Props = {
    delivery_data: DeliveryType;
};

const ProductManagerDeliveryCart = ({ delivery_data }: Props) => {

    const router = useRouter();

    const handlePdfButtonClick = () => {
        router.push(`http://localhost:5001/products/delivery/invoice/${delivery_data._id}`);
    };

    return (
        <div className={styles.cartItem}>
            <div className={styles.deliveryCart}>
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

                        {/* products */}
                        <th></th>
                        <tr>
                            <th>Name:</th>
                        </tr>
                        {delivery_data.products.map((product) => {
                            return (
                                <React.Fragment key={product._id}>
                                    <tr className={styles.deliveryProducts}>
                                        <td>{product.name}</td>
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
                {/* go to specific product */}
                <Link
                    key={delivery_data._id}
                    href={'/admin/product-manager/deliveries/' + delivery_data._id}
                    className={styles.viewProductButton}
                >
                    View Product
                </Link>

            </div>
        </div >
    );
};

export { ProductManagerDeliveryCart };
