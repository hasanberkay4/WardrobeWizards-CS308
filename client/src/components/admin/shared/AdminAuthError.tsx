import { useRouter } from "next/router";
import styles from '../../../styles/AdminAuthError.module.scss';

const AdminAuthError = () => {
    const router = useRouter();

    return (
        <div className={styles["admin-auth-error"]}>
            <h1>Not authorized</h1>
            <button onClick={() => router.push("/admin/")}>Go to admin login page</button>
        </div>
    );
};

export { AdminAuthError };
