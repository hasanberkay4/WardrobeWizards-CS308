import React, { ReactNode } from 'react';
import { AdminHeader } from './AdminHeader';
import { useAdminAuth } from '../../../context/AdminAuth';
import { AdminAuthError } from './AdminAuthError';
import { useRouter } from 'next/router';

type AdminLayoutProps = {
    children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { token } = useAdminAuth();
    const router = useRouter();

    return token
        ? (
            <div className="admin-layout">
                <h2>Admin Layout</h2>
                <AdminHeader />
                <div className="admin-layout__content">{children}</div>
            </div>
        )
        : <AdminAuthError />
};

export { AdminLayout };