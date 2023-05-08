import { AdminLayout } from "../../../components/admin/shared/AdminLayout";
import { ProductManagerLayout } from "../../../components/admin/product-manager/ProductManagerLayout";

const SalesManagerPage = () => {
    return (
        <AdminLayout>
            <ProductManagerLayout>
                <h1>Product Manager Page</h1>
            </ProductManagerLayout>
        </AdminLayout>
    )


}



export default SalesManagerPage;