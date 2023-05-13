import Link from 'next/link'
import styles from '../../../styles/ProductManagerFeatureCart.module.scss'

type ProductContent = {
    product_data: {
        _id: string,
        name: string,
        initial_price: number,
        category_ids: Array<string>,
        stock_quantity: number,
    }
}

const ProductManagerProductCart = ({ product_data }: ProductContent) => {

    return (
        <div className={styles.cartItem}>
            CartItem:
            <Link href={'/admin/product-manager/products/' + product_data._id}>
                <div className={styles.content}>
                    <p>{product_data.name}</p>
                    <p>{product_data.initial_price}</p>
                    <p>{product_data.category_ids}</p>
                    <p>{product_data.stock_quantity}</p>
                </div>
            </Link>
        </div>
    )
}

export { ProductManagerProductCart }