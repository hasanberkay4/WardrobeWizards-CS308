import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/Auth';

const ProfileIcon = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setAuthCookie } = useAuth();
    const router = useRouter();

    // Check if user is authenticated on mount
    useEffect(() => {
        const authToken = localStorage.getItem('token');
        setIsLoggedIn(!authToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setAuthCookie('');
        router.push('/');
    };

    return (
        <div>
            {isLoggedIn ? (
                <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Profile"
                    onClick={() => router.push('/profile')}
                >
                    Profile
                    {/* <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 12A4 4 0 1 0 12 4a4 4 0 0 0 0 8zm0 2a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
            </svg> */}
                </button>
            ) : null}
            {isLoggedIn ? (
                <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2"
                    aria-label="Logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            ) : null}
        </div>
    );
};

export default ProfileIcon;
