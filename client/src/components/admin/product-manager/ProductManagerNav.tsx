import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/ProductManagerNav.module.scss';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Deliveries', href: '/deliveries' },
    { label: 'Products', href: '/products' },
    { label: 'Comments', href: '/comments' },
];

const ProductManagerNav: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                {navItems.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <Link href={"/admin/product-manager" + item.href}>
                            <span className={styles.navLink}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav >
    );
};

export { ProductManagerNav };
