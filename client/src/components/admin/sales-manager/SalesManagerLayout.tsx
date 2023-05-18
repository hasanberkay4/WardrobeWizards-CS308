
import React from 'react';
import { SalesManagerNav } from './SalesManagerNav';
import styles from '../../../styles/ProductManagerLayout.module.scss'

type ProductManagerLayoutProps = {
    children: React.ReactNode;
};

const SalesManagerLayout = ({ children }: ProductManagerLayoutProps) => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <SalesManagerNav />
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export { SalesManagerLayout };