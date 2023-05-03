import { GetServerSideProps } from "next";
import ProfileEdit, { ProfileEditProps } from "../../components/profile/profileEdit";
import ProfileNav from "../../components/profile/profileNav";
import jwt_decode from 'jwt-decode';
import cookie from 'cookie';


export default function ProfileEditPage({ userInfo }: ProfileEditProps) {

    return (
        <div>
            <ProfileNav>
                <ProfileEdit userInfo={userInfo} />
            </ProfileNav>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProfileEditProps> = async (context) => {

    // Get the authentication token from cookies
    const { req } = context;
    const cookies = cookie.parse(req.headers.cookie || '');
    const authToken = cookies['token'];

    if (!authToken) {
        console.error('Authentication token is missing');
        return {
            props: {
                userInfo: [], // return an empty deliveries array in case of missing token
            },
        };
    }

    const decodedToken = jwt_decode(authToken) as { user_id: string; };
    const userId = decodedToken.user_id;
    console.log("usedId", userId);

    const userInfoResp = await fetch('http://localhost:5001/users/user/${userId}');
    const userInfo = await userInfoResp.json();

    return {
        props: {
            userInfo,
        },
    };

}