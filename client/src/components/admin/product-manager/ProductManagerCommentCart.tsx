import { useState } from 'react'
import styles from '../../../styles/ProductManagerFeatureCart.module.scss'


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

    const [isApproved, setIsApproved] = useState(comment_data.approved);

    const toggleApproval = async () => {
        const response = await fetch(`http://localhost:5001/admin/comments/${comment_data._id}`, {
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
        <div className={styles.cartItem}>
            CommentItem:

            <div className={styles.content}>
                <p>{comment_data.customerId}</p>
                <p>{comment_data.productId}</p>
                <p>{comment_data.date}</p>
                {isApproved
                    ? <p>Approved</p>
                    : <p>Not approved</p>
                }
                <button onClick={toggleApproval}>
                    {isApproved ? 'Disapprove' : 'Approve'}
                </button>
                <p>{comment_data.rating}</p>
            </div>

        </div>
    )
}

export { ProductManagerCommentCart }