import { AdminLayout } from "../../../components/admin/shared/AdminLayout";
import { ProductManagerLayout } from "../../../components/admin/product-manager/ProductManagerLayout";


const ProductManagerPage = () => {

    return (
        <AdminLayout>
            <ProductManagerLayout>
                <h1>Product Manager Page</h1>
            </ProductManagerLayout>
        </AdminLayout>
    )
}




export default ProductManagerPage;