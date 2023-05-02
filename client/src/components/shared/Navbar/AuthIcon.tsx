import ProfileIcon from './ProfileIcon';
import Link from 'next/link';
import { useAuth } from '../../../context/Auth';

const AuthIcon = () => {
    const { token } = useAuth();

    return (
        token ? (
            <ProfileIcon />

        ) : (
            <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href="/auth/sign-in" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="/auth/sign-up" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                    </Link>
                </div>
            </div>
        )
    );
};

export default AuthIcon;

{/*
    
     />*/}
