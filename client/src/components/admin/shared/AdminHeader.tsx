import { useAdminAuth } from "../../../context/AdminAuth";
import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/AdminHeader.module.scss";

const AdminHeader = () => {
    const { token, username, title, setAdminAuthCookie, removeAdminAuthCookie } = useAdminAuth();

    return (
        <div className={styles["admin-header"]}>
            <div className={styles["admin-header__logo"]}>
                <Link href="/admin">
                    <div className={styles["admin-header__logo__container"]}>
                        <Image src="/admin/logo.jpg" alt="AdminLogo" width={60} height={60} className={styles["admin-header__logo__image"]} />
                    </div>
                </Link>
            </div>
            <div className={styles["admin-header__account"]}>
                <div className={styles["admin-header__account__info"]}>
                    <span className={styles["admin-header__account__info__username"]}>Username: {username}</span>
                    <span className={styles["admin-header__account__info__title"]}>Title: {title}</span>
                </div>
                <div className={styles["admin-header__account__actions"]}>
                    <button className={styles["admin-header__account__actions__logout"]} onClick={() => removeAdminAuthCookie()}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export { AdminHeader };
