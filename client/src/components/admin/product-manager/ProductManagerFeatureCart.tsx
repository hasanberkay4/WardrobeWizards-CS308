import styles from '../../../styles/ProductManagerFeatureCart.module.scss'

type ProductContent = {
    _id: string,
    name: string,
    initial_price: number,
    category_ids: Array<string>
}

type CommentContent = {
    _id: string,
    customerId: string,
    productId: string,
    date: string,
    approved: boolean,
    rating: number,
    __v: number
}

type DeliveryContent = {
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

const ProductManagerFeatureCart = ({ feature_name, feature_data }: any) => {

    let content = null;

    if (feature_name === 'products') {
        const product_data = feature_data as ProductContent;
        content = (
            <div className={styles.content}>
                <p>{product_data.name}</p>
                <p>{product_data.initial_price}</p>
                <p>{product_data.category_ids}</p>
            </div>
        )
    } else if (feature_name === 'comments') {
        const comment_data = feature_data as CommentContent;
        content = (
            <div className={styles.content}>
                <p>{comment_data.customerId}</p>
                <p>{comment_data.productId}</p>
                <p>{comment_data.date}</p>
                <p>{comment_data.approved}</p>
                <p>{comment_data.rating}</p>
            </div>
        )
    } else if (feature_name === 'deliveries') {
        const delivery_data = feature_data as DeliveryContent;
        content = (
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
        )
    }

    return (
        <div className={styles.cartItem}>
            CartItem:
            {content}
        </div>
    )
}

export { ProductManagerFeatureCart }