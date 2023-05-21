import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import { useState } from "react"
import Link from "next/link"
import styles from '../../../../styles/ProductManagerCommentPage.module.scss'
import { CommentType, CommentTypeSchema } from "../../../../types/adminTypes/commentType"

type Props = {
    comment_info: CommentType;
}

const ProductManagerCommentPage = ({ comment_info }: Props) => {

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
                                <tr>
                                    <th>Comment Content:</th>
                                    <td>{comment_info.description}</td>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {

        // get id from url
        const id = context.params?.id ?? '';

        // get comment info
        const response = await fetch(`http://localhost:5001/admin/comments/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // convert response to json
        const comment_response = await response.json();

        // make sure comment_response is of type CommentType
        const comment = CommentTypeSchema.parse(comment_response.comment);

        // make date readable
        comment.date = new Date(comment.date).toLocaleDateString();

        return {
            props: { comment_info: comment }
        }
    }
    catch (error) {
        console.error(error);
        return {
            props: { comment_info: {} }
        }
    }
}


export default ProductManagerCommentPage