import React from 'react';
import { ProductManagerNav } from './ProductManagerNav';
import styles from '../../../styles/ProductManagerLayout.module.scss'

type ProductManagerLayoutProps = {
    children: React.ReactNode;
};

const ProductManagerLayout = ({ children }: ProductManagerLayoutProps) => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <ProductManagerNav />
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export { ProductManagerLayout };