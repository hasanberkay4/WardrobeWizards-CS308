import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <div className="ml-4 flex lg:ml-0">
            <Link href="/">
                <span className="sr-only">Your Company</span>
                <Image
                    className="w-auto h-auto"
                    src="/logo.jpg"
                    alt="logo"
                    width={64}
                    height={64}
                />
            </Link>
        </div>
    );
};

export default Logo;
