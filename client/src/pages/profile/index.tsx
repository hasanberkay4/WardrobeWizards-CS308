import { GetServerSideProps } from 'next';
import ProfileHome, { ProfileHomeProps } from '../../components/profile/profileHome';
import ProfileNav from '../../components/profile/profileNav';
import jwt_decode from 'jwt-decode';
import cookie from 'cookie';

const ProfilePage = ({ profileInfo }: ProfileHomeProps) => {
    return (
        <>
            <ProfileNav>
                <ProfileHome profileInfo={profileInfo} />
            </ProfileNav>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<ProfileHomeProps> = async (context) => {
    // get user profile info
    const { req } = context;

    // Get the authentication token from cookies
    const cookies = cookie.parse(req.headers.cookie || '');
    const authToken = cookies['token'];

    if (!authToken) {
        console.error('Authentication token is missing');
        return {
            props: {
                profileInfo: [], // return an empty deliveries array in case of missing token
            },
        };
    }

    const decodedToken = jwt_decode(authToken) as { user_id: string; };
    const userId = decodedToken.user_id;
    console.log("usedId", userId);

    const user = await fetch(`http://localhost:5001/users/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const profileInfo = await user.json()

    return {
        props: {
            profileInfo
        }
    };
};

export default ProfilePage;
