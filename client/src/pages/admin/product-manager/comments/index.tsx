import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerCommentCart } from "../../../../components/admin/product-manager/ProductManagerCommentCart"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import { CommentArrayType, CommentArrayTypeSchema } from "../../../../types/adminTypes/commentType"


type Props = {
    comment_array: CommentArrayType;
}

const ProductManagerProductsPage = ({ comment_array }: Props) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    {comment_array.map((data) => {
                        return (
                            <div key={data._id}>
                                <ProductManagerCommentCart comment_data={data} />
                            </div>
                        )
                    })}
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    try {
        // fetch comments data
        const response = await fetch(`http://localhost:5001/admin/comments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // convert to json
        const comment_response = await response.json();

        // make sure comments are of type CommentArrayType
        const comment_array = CommentArrayTypeSchema.parse(comment_response.comments);

        // sort by date
        comment_array.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // make comment dates readable
        comment_array.forEach((comment: any) => {
            const date = new Date(comment.date);
            comment.date = date.toDateString();
        });

        // 
        return {
            props: { comment_array: comment_array }
        };

    }

    catch (err) {
        console.log(err);
        return { props: { comment_array: [] } };
    }
}


export default ProductManagerProductsPage