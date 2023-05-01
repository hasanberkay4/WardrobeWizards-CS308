import { GetServerSideProps } from 'next';
import ProfileHome, { ProfileHomeProps } from '../../components/profile/profileHome';
import ProfileNav from '../../components/profile/profileNav';

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
    // do stuff 

    const profileInfo = {
        name: "John Doe"
    }

    return {
        props: {
            profileInfo
        }
    };
};

export default ProfilePage;
