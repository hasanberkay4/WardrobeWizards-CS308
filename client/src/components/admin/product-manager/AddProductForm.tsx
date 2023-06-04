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


const AddProductForm = ({ category_options }: Props) => {

    // product fields
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock_quantity, setStockQuantity] = useState(0);
    const [initial_price, setInitialPrice] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<readonly OptionType[]>([]);


    // image fields
    const [imageFile, setImageFile] = useState<File | null>(null);

    // router
    const router = useRouter();


    // handle submit form
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();


        // ---- add product ----

        const expense = initial_price / 2;

        // create a json object to be sent to the server as the body of the request
        const product_form_data = {
            "name": name,
            "description": description,
            "stock_quantity": stock_quantity,
            "initial_price": initial_price,
            "expense": expense,
            "category_slugs": selectedOptions.map(option => option.value),
            "warranty_status": false,
            "image": imageFile ? imageFile.name : null,
        };

        console.log("product: ", product_form_data);

        const product_form_response = await fetch('http://localhost:5001/admin/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product_form_data),
        });

        if (!product_form_response.ok) {
            alert("Error adding product");
            return;
        }


        // ---- add expense transaction ----

        console.log("expense: ", expense);
        const expense_response = await fetch("http://localhost:5001/transaction/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "amount": expense,
                "type": "expense",
            })
        });

        if (!expense_response.ok) {
            alert("Error adding expense!");
            return;
        }

        // ---- add image file ----

        // add imageFile to formData
        const formData = new FormData();
        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        const image_response = await fetch(`http://localhost:5001/upload`, {
            method: 'POST',
            body: formData
        });


        // ---- check responses ----
        // alert dialog
        if (product_form_response.ok && expense_response.ok && image_response.ok) {
            alert("Product added successfully!")
            router.push("/admin/product-manager/products");
        }


    };


    const handleSelectChange = (selectedOptions: readonly OptionType[] | null, actionMeta: ActionMeta<OptionType>) => {
        setSelectedOptions(selectedOptions || []);
    }

    // convert category_options to the format needed by react-select
    const options: OptionType[] = category_options.map(category => ({ value: category.slug, label: category.name }));



    return (
        <div className={styles.container}>
            <h1>Add Product Page</h1>
            <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">

                {/* text fields */}
                <label className={styles.label} htmlFor="name">Name</label>
                <input className={styles.input} type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

                <label className={styles.label} htmlFor="description">Description</label>
                <input className={styles.input} type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />


                {/* select categories */}
                <label htmlFor="categories">Categories</label>
                <Select
                    isMulti
                    name="categories"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelectChange}
                    value={selectedOptions}
                />


                {/* numberic values */}
                < label className={styles.label} htmlFor="price" > Initial Price</label>
                <input className={styles.input} type="number" id="price" value={initial_price} onChange={e => setInitialPrice(e.target.valueAsNumber)} />

                <label className={styles.label} htmlFor="stock">Stock Quantity</label>
                <input className={styles.input} type="number" id="stock" value={stock_quantity} onChange={e => setStockQuantity(e.target.valueAsNumber)} />

                {/* image */}
                <label className={styles.label} htmlFor="imageFile">Product Image</label>
                <input className={styles.input} type="file" name="image_file" id="imageFile" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                    }
                    return;
                }} />

                <button className={styles.button} type="submit">Add Product</button>
            </form>
        </div >
    );


}



export { AddProductForm }