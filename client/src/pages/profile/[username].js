import { useRouter } from "next/router";
const Profile = ()=>{
    const router= useRouter();
    const {username} = router.query;
return <div> Welcome {username} </div>;
};
export default Profile;