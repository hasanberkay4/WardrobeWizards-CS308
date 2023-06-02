import { useState } from "react"
import { useRouter } from "next/router";
import styles from '../../../styles/AddProductForm.module.scss'
import React, { ChangeEvent } from 'react';
import Select, { ActionMeta } from 'react-select';


type Props = {
    category_options: {
        _id: string,
        name: string,
        slug: string,
    }[],
}

interface OptionType {
    value: string;
    label: string;
}


const AddCategoryForm = ({ category_options }: Props) => {

    // product fields
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");


    // router
    const router = useRouter();


    // handle submit form
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5001/admin/products/add-category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    slug,
                })
            });

            const data = await response.json();

            if (data.error) {
                alert(data.message);
            }

            else {
                alert("Category added successfully");
                router.push("/admin/product-manager/");
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div className={styles.container}>
            <h1>Add Product Page</h1>
            <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">

                {/* text fields */}
                <label className={styles.label} htmlFor="name">Name</label>
                <input className={styles.input} type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

                <label className={styles.label} htmlFor="slug">Slug</label>
                <input className={styles.input} type="text" id="slug" value={slug} onChange={e => setSlug(e.target.value)} />

                <button className={styles.button} type="submit">Add Category</button>
            </form>
        </div >
    );


}



export { AddCategoryForm }