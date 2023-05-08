import React, { ReactNode } from 'react';
import { AdminHeader } from './AdminHeader';

type AdminLayoutProps = {
    children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="admin-layout">
            <h2>Admin Layout</h2>
            <AdminHeader />
            <div className="admin-layout__content">{children}</div>
        </div>
    );
};

export { AdminLayout };