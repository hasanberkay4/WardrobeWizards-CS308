import { GetServerSideProps } from "next"
import { DeliveriesProps } from "../../components/profile/profileDeliveries"
import ProfileDeliveries from "../../components/profile/profileDeliveries"
import ProfileNav from "../../components/profile/profileNav"

export default function ProfileDeliveriesPage({ deliveries }: DeliveriesProps) {
    return (
        <div>
            <ProfileNav >
                <h1>Deliveries</h1>
                <ProfileDeliveries deliveries={deliveries} />
            </ProfileNav>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<DeliveriesProps> = async (context) => {
    // get user profile info
    const deliveries = [{
        name: "Delivery 1"
    }, {
        name: "Delivery 2"
    }]

    return {
        props: {
            deliveries
        }
    }
}