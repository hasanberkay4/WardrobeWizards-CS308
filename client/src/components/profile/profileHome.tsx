
export type ProfileHomeProps = {
    profileInfo: {
        name: string
    }
}

export default function ProfileHome({ profileInfo }: ProfileHomeProps) {
    return (
        <div>
            <h1>Profile Home</h1>
            <h2>{profileInfo.name}</h2>
        </div>
    )
}