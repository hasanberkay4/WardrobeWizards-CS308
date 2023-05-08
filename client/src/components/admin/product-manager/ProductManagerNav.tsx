import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/ProductManagerNav.module.scss';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Products', href: '/products' },
    { label: 'Orders', href: '/orders' },
    { label: 'Customers', href: '/customers' },
    { label: 'Settings', href: '/settings' },
];

const ProductManagerNav: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                {navItems.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <Link href={"product-manager/" + item.href}>
                            <span className={styles.navLink}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav >
    );
};

export { ProductManagerNav };
