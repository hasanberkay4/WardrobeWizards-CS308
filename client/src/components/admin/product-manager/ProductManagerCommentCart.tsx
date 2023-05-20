import styles from '../../../styles/ProductManagerFeatureCart.module.scss';
import Link from 'next/link';

type CommentContent = {
    comment_data: {
        _id: string;
        customerId: string;
        productId: string;
        date: string;
        approved: boolean;
        rating: number;
        __v: number;
    };
};

const ProductManagerCommentCart = ({ comment_data }: CommentContent) => {
    return (
        <div className={styles.cartItem}>
            <table>
                <tbody>
                    <tr>
                        <th>Customer ID:</th>
                        <td>{comment_data.customerId}</td>
                    </tr>
                    <tr>
                        <th>Product ID:</th>
                        <td>{comment_data.productId}</td>
                    </tr>
                    <tr>
                        <th>Date:</th>
                        <td>{comment_data.date}</td>
                    </tr>
                    <tr>
                        <th>Status:</th>
                        <td>{comment_data.approved ? 'Approved' : 'Not approved'}</td>
                    </tr>
                    <tr>
                        <th>Rating:</th>
                        <td>{comment_data.rating}</td>
                    </tr>
                </tbody>
            </table>
            <Link href={'/admin/product-manager/comments/' + comment_data._id}>
                <p className={styles.link}>View Comment</p>
            </Link>
        </div>
    );
};

export { ProductManagerCommentCart };
