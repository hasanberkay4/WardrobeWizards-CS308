
export type ProfileHomeProps = {
    profileInfo: {
        name: string,
        wallet:number
    }
}

export default function ProfileHome({ profileInfo }: ProfileHomeProps) {
    return (
        <div>
            <h1>Profile Home</h1>
            <h2>Name: {profileInfo.name}</h2>
            <h2>Wallet: ₺{profileInfo.wallet}</h2>
        </div>
    )
}