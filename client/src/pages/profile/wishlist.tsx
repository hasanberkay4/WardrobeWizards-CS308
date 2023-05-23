import { GetServerSideProps } from 'next';
import ProfileNav from '../../components/profile/profileNav';
import jwt_decode from 'jwt-decode';
import cookie from 'cookie';
import ProfileWishedProducts, { WishedProductsProps } from '../../components/profile/profileWishes';

const ProfileWishlistPage = ({ wishedProducts }: WishedProductsProps) => {
    return (
        <>
            <ProfileNav>
                <h1 className="text-3xl font-bold ml-7 mb-5" >Wishlist</h1>
                <ProfileWishedProducts wishedProducts={wishedProducts} />
            </ProfileNav>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<WishedProductsProps> = async (context) => {
    // Fetch wished products
    const { req } = context;

    // Get the authentication token from cookies
    const cookies = cookie.parse(req.headers.cookie || '');
    const authToken = cookies['token'];

    if (!authToken) {
        console.error('Authentication token is missing');
        return {
            props: {
                wishedProducts: [],
            },
        };
    }

    const decodedToken = jwt_decode(authToken) as { user_id: string };
    const userId = decodedToken.user_id;

    const response = await fetch(`http://localhost:5001/products/get-user-wishes/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Failed to fetch wished products');
        return {
            props: {
                wishedProducts: [], // Return an empty array in case of failure
            },
        };
    }

    const wishedProducts = await response.json();

    return {
        props: {
            wishedProducts,
        },
    };
};

export default ProfileWishlistPage;
