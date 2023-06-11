export type ProfileHomeProps = {
    profileInfo: {
        name: string,
        wallet: number,
        address: string
    }
}

export default function ProfileHome({ profileInfo }: ProfileHomeProps) {
    return (
        <div className="mt-4 ml-4">
            <div className="max-w-lg bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{profileInfo.name}</div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Wallet Balance</h2>
                    <p className="mt-2 text-gray-500 text-xl">₺{profileInfo.wallet}</p>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Address</h2>
                    <p className="mt-2 text-gray-500 text-xl">{profileInfo.address}</p>
                </div>
            </div>
        </div>
    )
}
