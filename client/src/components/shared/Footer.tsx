function Footer() {
    const navigation = [
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'FAQs', href: '#' },
    ];

    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-12 border-t border-gray-200">
                    <div className="flex space-x-8">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-base font-medium text-gray-500 hover:text-gray-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="mt-8 text-sm text-gray-500">
                        <div className="flex items-center">
                            <span className="text-gray-400 pr-2">✉️</span>
                            <span>Email: support@example.com</span>
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-gray-400 pr-2">📞</span>
                            <span>Phone: +1 (555) 123-4567</span>
                        </div>
                    </div>
                    <div className="mt-8 text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
