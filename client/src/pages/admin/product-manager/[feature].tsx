import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerFeatureCart } from "../../../components/admin/product-manager/ProductManagerFeatureCart"
import { AdminLayout } from "../../../components/admin/shared/AdminLayout"

type ProductManagerFeaturePageProps = {
    feature_name: string;
    feature_data: any;
}


const features = ['deliveries', 'products', 'comments'];
const ProductManagerFeaturePage = ({ feature_name, feature_data }: ProductManagerFeaturePageProps) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    {feature_data[feature_name].map((data: any) => {
                        return (
                            <div key={data._id}>
                                <ProductManagerFeatureCart feature_name={feature_name} feature_data={data} />
                            </div>
                        )
                    })}
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProductManagerFeaturePageProps> = async (context) => {
    const feature = (context.params?.feature ?? '') as string;

    const response = await fetch(`http://localhost:5001/admin/${feature}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const feature_data = await response.json();

    return {
        props: {
            feature_name: feature,
            feature_data: feature_data
        }
    }
}


export default ProductManagerFeaturePage