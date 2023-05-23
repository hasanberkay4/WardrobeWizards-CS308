import { useState, FormEvent, ChangeEvent } from "react";
import styles from "../../../styles/AdminLogin.module.scss";
import { Router, useRouter } from "next/router";
import { useAdminAuth } from "../../../context/AdminAuth";

const AdminLogin = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const router = useRouter();
    const { token, setAdminAuthCookie } = useAdminAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        }
        if (name === "password") {
            setPassword(value);
        }
        if (name === "title") {
            setTitle(value);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const loginResponse = await fetch("http://localhost:5001/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "title": title
                }),
            });
            if (loginResponse.ok) {
                console.log("login successful");
            } else {
                console.log("login failed");
                return;
            }
            const loginResponseJson = await loginResponse.json();
            alert(loginResponseJson.status);

            // set adminAuthContext cookie
            setAdminAuthCookie(loginResponseJson.token);

            if (title === "product-manager") {
                router.push("/admin/product-manager");
            } else if (title === "sales-manager") {
                router.push("/admin/sales-manager");
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles["admin-login"]}>
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" required onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" required onChange={handleChange} />
                </label>
                <br />
                <label>
                    Title:
                    <select name="title" value={title} required onChange={handleChange}>
                        <option value="">Select Title</option>
                        <option value="product-manager">Product Manager</option>
                        <option value="sales-manager">Sales Manager</option>
                    </select>
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export { AdminLogin };
