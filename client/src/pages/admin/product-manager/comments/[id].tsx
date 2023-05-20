import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import { useState } from "react"
import Link from "next/link"
import styles from '../../../../styles/ProductManagerCommentPage.module.scss'

export type ProductManagerCommentPageProps = {
    comment_info: {
        _id: string,
        customerId: string,
        productId: string,
        date: string,
        approved: boolean,
        rating: number,
        __v: number
    }
}

const features = ['deliveries', 'products', 'comments'];
const ProductManagerCommentPage = ({ comment_info }: ProductManagerCommentPageProps) => {


    const [isApproved, setIsApproved] = useState(comment_info.approved);

    const toggleApproval = async () => {
        const response = await fetch(`http://localhost:5001/admin/comments/${comment_info._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            setIsApproved(!isApproved);
        } else {
            // handle error
            console.error("Error updating approval status");
        }
    };


    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    <div className={styles.cartItem}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Customer ID:</th>
                                    <td>{comment_info.customerId}</td>
                                </tr>
                                <tr>
                                    <th>Product ID:</th>
                                    <td>{comment_info.productId}</td>
                                </tr>
                                <tr>
                                    <th>Date:</th>
                                    <td>{comment_info.date}</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td>{isApproved ? 'Approved' : 'Not approved'}</td>
                                </tr>
                                <tr>
                                    <th>Rating:</th>
                                    <td>{comment_info.rating}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={toggleApproval}>
                            {isApproved ? 'Disapprove' : 'Approve'}
                        </button>
                        <Link href={'/admin/product-manager/comments/'}>
                            <p className={styles.link}>Back to Comments</p>
                        </Link>
                    </div>
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<ProductManagerCommentPageProps> = async (context) => {
    const id = context.params?.id ?? '';

    const response = await fetch(`http://localhost:5001/admin/comments/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const comment_info = await response.json();

    return {
        props: {
            comment_info: comment_info.comment,
        }
    }
}


export default ProductManagerCommentPage