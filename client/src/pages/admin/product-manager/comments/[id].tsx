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
                        CommentItem:
                        <Link href={'/admin/product-manager/comments/' + comment_info._id}>
                            <div className={styles.content}>
                                <p>{comment_info.customerId}</p>
                                <p>{comment_info.productId}</p>
                                <p>{comment_info.date}</p>
                                {isApproved
                                    ? <p>Approved</p>
                                    : <p>Not approved</p>
                                }
                                <button onClick={toggleApproval}>
                                    {isApproved ? 'Disapprove' : 'Approve'}
                                </button>
                                <p>{comment_info.rating}</p>
                            </div>

                        </Link>
                    </div>
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
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