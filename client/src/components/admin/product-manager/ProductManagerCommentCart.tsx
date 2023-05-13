import { useState } from 'react'
import styles from '../../../styles/ProductManagerFeatureCart.module.scss'
import Link from 'next/link'


type CommentContent = {
    comment_data: {
        _id: string,
        customerId: string,
        productId: string,
        date: string,
        approved: boolean,
        rating: number,
        __v: number
    }
}


const ProductManagerCommentCart = ({ comment_data }: CommentContent) => {



    return (
        <div className={styles.cartItem}>
            CommentItem:
            <Link href={'/admin/product-manager/comments/' + comment_data._id}>
                <div className={styles.content}>
                    <p>{comment_data.customerId}</p>
                    <p>{comment_data.productId}</p>
                    <p>{comment_data.date}</p>
                    {comment_data.approved
                        ? <p>Approved</p>
                        : <p>Not approved</p>
                    }
                    <p>{comment_data.rating}</p>
                </div>

            </Link>
        </div>
    )
}

export { ProductManagerCommentCart }