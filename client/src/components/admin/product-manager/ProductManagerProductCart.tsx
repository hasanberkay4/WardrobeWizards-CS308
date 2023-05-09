import styles from '../../../styles/ProductManagerFeatureCart.module.scss'

type ProductContent = {
    product_data: {
        _id: string,
        name: string,
        initial_price: number,
        category_ids: Array<string>
    }
}

const ProductManagerProductCart = ({ product_data }: ProductContent) => {

    return (
        <div className={styles.cartItem}>
            CartItem:
            <div className={styles.content}>
                <p>{product_data.name}</p>
                <p>{product_data.initial_price}</p>
                <p>{product_data.category_ids}</p>
            </div>
        </div>
    )
}

export { ProductManagerProductCart }