import { ProfileEditProps } from "../../components/profile/profileEdit";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const handleProfileEditSubmit = async ({ userInfo }: ProfileEditProps, token: string) => {
    try {
        // find the user with given token
        // update the user's info with the new info
        const authToken = Cookies.get('token');

        if (authToken === '' || !authToken) {
            console.error('Authentication token is missing');
            return;
        }
        const decodedToken = jwt_decode(authToken!) as { user_id: string };
        const userId = decodedToken.user_id;
        console.log("usedId", userId);


        const response = await fetch(`http://localhost:5001/users/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });

        if (!response.ok) {
            throw new Error("Error submitting edit profile");
        }

        const data = await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};

export { handleProfileEditSubmit } 