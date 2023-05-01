/* eslint-disable react/jsx-key */

export type DeliveriesProps = {
    deliveries: {
        name: string;
    }[]
}

const ProfileDeliveries = ({ deliveries }: DeliveriesProps) => {
    return (
        <div>
            {deliveries.map((delivery) => {
                return (
                    <div>
                        <h1>{delivery.name}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default ProfileDeliveries;
