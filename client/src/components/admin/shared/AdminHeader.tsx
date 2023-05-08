import { useAdminAuth } from "../../../context/AdminAuth";
import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/AdminHeader.module.scss"

const AdminHeader = () => {
    const { token, username, title, setAdminAuthCookie, removeAdminAuthCookie } = useAdminAuth();

    return (
        <div className={styles["admin-header"]}>
            <div className="admin-header__logo">
                <Link href='/admin'>
                    <Image src='/admin/logo.jpg' alt="AdminLogo" width={200} height={200} />
                </Link>
            </div>
            <div className="admin-header__account">
                <div className="admin-header__account__info">
                    <span>username: {username}</span>
                    <span>title: {title}</span>
                </div>
                <div className="admin-header__account__actions">
                    <button onClick={() => removeAdminAuthCookie()}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export { AdminHeader };