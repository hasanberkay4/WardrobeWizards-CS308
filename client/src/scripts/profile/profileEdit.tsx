import { ProfileEditProps } from "../../components/profile/profileEdit";

const handleProfileEditSubmit = async ({ userInfo }: ProfileEditProps, token: string) => {
    try {
        // find the user with given token
        // update the user's info with the new info
        const response = await fetch(`http://localhost:5001/profile/edit/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });

        if (!response.ok) {
            throw new Error("Error submitting edit profile");
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
};

export { handleProfileEditSubmit } 