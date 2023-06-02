import Link from 'next/link';
import styles from '../../../styles/ProductManagerFeatureCart.module.scss';
import { Product } from '../../../types/productType';

type ProductContent = {
    product_data: Product
};

const ProductManagerProductCart = ({ product_data }: ProductContent) => {
    return (
        <div className={styles.cartItem}>
            <Link href={'/admin/product-manager/products/' + product_data._id}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>{product_data.name}</td>
                        </tr>
                        <tr>
                            <th>Initial Price:</th>
                            <td>{product_data.initial_price}</td>
                        </tr>
                        <tr>
                            <th>Category IDs:</th>
                            <td>{product_data.category_ids.join(', ')}</td>
                        </tr>
                        <tr>
                            <th>Stock Quantity:</th>
                            <td>{product_data.stock_quantity}</td>
                        </tr>
                        <tr>
                            <th>Discount Rate:</th>
                            <td>{product_data.discountRate}</td>
                        </tr>
                    </tbody>
                </table>
            </Link>
        </div>
    );
};

export { ProductManagerProductCart };
