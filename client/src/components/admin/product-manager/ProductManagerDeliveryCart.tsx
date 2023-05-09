import { useState } from 'react'
import styles from '../../../styles/ProductManagerFeatureCart.module.scss'
import Link from 'next/link'

type DeliveryContent = {
    delivery_data: {
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

const ProductManagerDeliveryCart = ({ delivery_data }: DeliveryContent) => {

    return (
        <div className={styles.cartItem}>
            <Link key={delivery_data._id} href={'/admin/product-manager/deliveries/' + delivery_data._id}>
                DeliveryItem:
                <div className={styles.content}>
                    <p>{delivery_data.deliveryAddress}</p>
                    <p>{delivery_data.customerId}</p>
                    <p>{delivery_data.quantity}</p>
                    <p>{delivery_data.totalPrice}</p>
                    <p>{delivery_data.status}</p>
                    <p>{delivery_data.date}</p>
                    {delivery_data.products.map((product: any) => {
                        return (
                            <div key={product._id}>
                                <p>{product.productId}</p>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p>{product.description}</p>
                                <p>{product.quantity}</p>
                            </div>
                        )
                    })}
                    <p>{delivery_data.pdfUrl}</p>
                </div>
            </Link>
        </div>
    )
}

export { ProductManagerDeliveryCart }