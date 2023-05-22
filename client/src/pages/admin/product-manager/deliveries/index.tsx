import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { ProductManagerDeliveryCart } from "../../../../components/admin/product-manager/ProductManagerDeliveryCart"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import { DeliveryArrayTypeSchema, DeliveryArrayType } from "../../../../types/adminTypes/deliveryType"

type Props = {
    delivery_array: DeliveryArrayType
}


const ProductManagerProductsPage = ({ delivery_array }: Props) => {

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    {delivery_array.map((data: any) => {
                        return (
                            <div key={data._id}>
                                <ProductManagerDeliveryCart delivery_data={data} />
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
        // fetch delivery data 
        const response = await fetch(`http://localhost:5001/admin/deliveries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // convert delivery data to json
        const delivery_response = await response.json();

        // make sure delivery data is of type DeliveryArrayType
        const delivery_array = DeliveryArrayTypeSchema.parse(delivery_response.deliveries);

        // sort delivery data by date
        delivery_array.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return {
            props: { delivery_array: delivery_array }
        }
    }
    catch (err) {
        console.log(err)
        return {
            props: {
                delivery_array: [],
            }
        }
    }
}


export default ProductManagerProductsPage