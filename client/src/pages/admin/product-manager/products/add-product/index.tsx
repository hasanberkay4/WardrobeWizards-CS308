import { useState } from "react"
import { useRouter } from "next/router";
import styles from '../../../../../styles/AddProductPage.module.scss'

const AddProductPage = () => {
    const [name, setName] = useState("");
    const [initial_price, setInitialPrice] = useState(0);
    const [category_ids, setCategoryIds] = useState("");
    const [stock_quantity, setStockQuantity] = useState(0);
    const [expense, setExpense] = useState(0);
    const [imageName, setImageName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // add imageFile to formData
        const formData = new FormData();
        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        // validate form
        const r = await fetch('http://localhost:5001/admin/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "description": "description",
                "initial_price": initial_price,
                "category_ids": [category_ids],
                "stock_quantity": stock_quantity,
                "expense": expense,
                "image_name": imageName,
                "image_file": imageFile
            })
        });

        const rJson = await r.json();
        if (r.ok) {
            console.log(rJson);
        } else {
            console.error("Error adding product", rJson);
        }

        // expense endpoint
        const expenseResponse = await fetch("http://localhost:5001/transaction/add", {
            method: "POST",
            body: JSON.stringify({
                "amount": expense,
                "type": "expense",
            })
        });
        const expenseResponseJson = await expenseResponse.json();
        if (expenseResponse.ok) {
            console.log(expenseResponseJson);
        } else {
            console.error("Error adding expense", expenseResponseJson);
        }

        // upload file to server
        const response = await fetch(`http://localhost:5001/upload`, {
            method: 'POST',
            body: formData
        });

        // alert dialog
        if (response.ok) {
            const responseJson = await response.json();
            console.log(responseJson);
            alert("Product added successfully!")
            router.push('/admin/product-manager/products');
        } else {
            // handle error
            console.error("Error adding product", await response.text());
        }

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Add Product Page</h1>
            <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
                <label className={styles.label} htmlFor="name">Name</label>
                <input className={styles.input} type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

                <label className={styles.label} htmlFor="price">Initial Price</label>
                <input className={styles.input} type="number" id="price" value={initial_price} onChange={e => setInitialPrice(e.target.valueAsNumber)} />

                <label className={styles.label} htmlFor="categories">Category IDs (comma-separated)</label>
                <input className={styles.input} type="text" id="categories" value={category_ids} onChange={e => setCategoryIds(e.target.value)} />

                <label className={styles.label} htmlFor="stock">Stock Quantity</label>
                <input className={styles.input} type="number" id="stock" value={stock_quantity} onChange={e => setStockQuantity(e.target.valueAsNumber)} />

                <label className={styles.label} htmlFor="expense">Expense</label>
                <input className={styles.input} type="number" id="expense" value={expense} onChange={e => setExpense(e.target.valueAsNumber)} />

                <label className={styles.label} htmlFor="imageName">Image Name</label>
                <input className={styles.input} type="text" id="imageName" value={imageName} onChange={e => setImageName(e.target.value)} />

                <label className={styles.label} htmlFor="imageFile">Product Image</label>
                <input className={styles.input} type="file" name="image_file" id="imageFile" onChange={handleFileChange} />

                <button className={styles.button} type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProductPage;
