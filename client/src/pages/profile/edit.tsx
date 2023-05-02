import { GetServerSideProps } from "next";
import ProfileEdit, { ProfileEditProps } from "../../components/profile/profileEdit";
import ProfileNav from "../../components/profile/profileNav";

export default function ProfileEditPage({ userInfo }: ProfileEditProps) {

    return (
        <div>
            <ProfileNav>
                <ProfileEdit userInfo={userInfo} />
            </ProfileNav>
        </div>
    )
}