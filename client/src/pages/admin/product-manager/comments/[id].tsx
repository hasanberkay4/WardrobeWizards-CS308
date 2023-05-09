import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerDeliveryCart } from "../../../../components/admin/product-manager/ProductManagerDeliveryCart"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"

type ProductManagerCommentPageProps = {
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
const ProductManagerProductsPage = ({ comment_info }: ProductManagerCommentPageProps) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    <h1> Delivery Info: {comment_info._id} </h1>
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


export default ProductManagerProductsPage