import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerCommentCart } from "../../../../components/admin/product-manager/ProductManagerCommentCart"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"

type ProductManagerCommentsPageProps = {
    comment_array: Array<{
        _id: string,
        customerId: string,
        productId: string,
        date: string,
        approved: boolean,
        rating: number,
        __v: number
    }>
}


const features = ['deliveries', 'products', 'comments'];
const ProductManagerProductsPage = ({ comment_array }: ProductManagerCommentsPageProps) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    {comment_array.map((data: any) => {
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

export const getServerSideProps: GetServerSideProps<ProductManagerCommentsPageProps> = async () => {

    const response = await fetch(`http://localhost:5001/admin/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const comment_array = await response.json();

    return {
        props: {
            comment_array: comment_array.comments,
        }
    }
}


export default ProductManagerProductsPage