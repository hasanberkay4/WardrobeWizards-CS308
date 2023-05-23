import { useState } from "react"
import { useRouter } from "next/router";
import styles from '../../../styles/AddProductForm.module.scss'
import Select from "react-select";

type Props = {
    category_options: { value: string, label: string }[];
    color_options: { value: string, label: string }[];
    model_options: { value: string, label: string }[];
}



const AddProductForm = ({ category_options, color_options, model_options }: Props) => {

    // product fields
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [model, setModel] = useState([]);
    const [color, setColor] = useState([]);
    const [stock_quantity, setStockQuantity] = useState(0);
    const [initial_price, setInitialPrice] = useState(0);
    const [expense, setExpense] = useState(0);
    const [category_slugs, setCategorySlugs] = useState([]);
    const [warranty, setWarranty] = useState("");

    // image fields
    const [imageName, setImageName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    // router
    const router = useRouter();


    // handle submit form
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();


        // ---- add product ----
        const product_form_response = await fetch('http://localhost:5001/admin/products', {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "description": description,
                "model": model,
                "color": color,
                "stock_quantity": stock_quantity,
                "initial_price": initial_price,
                "expense": expense,
                "warranty_status": warranty,
            })
        });

        if (product_form_response.ok) {
            alert("Product added successfully!")
        }


        // ---- add expense transaction ----
        const expense_response = await fetch("http://localhost:5001/transaction/add", {
            method: "POST",
            body: JSON.stringify({
                "amount": expense,
                "type": "expense",
            })
        });

        let expense_id = "";
        if (expense_response.ok) {
            const expenseResponseJson = await expense_response.json();
            expense_id = expenseResponseJson.transaction_id as string;
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

        // alert dialog
        if (image_response.ok) {
            alert("Product added successfully!")
            router.push('/admin/product-manager/products');
        } else {
            alert("Error adding image!")
        }
    };


    return (
        <div className={styles.container}>
            <h1>Add Product Page</h1>
            <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">

                {/* text fields */}
                <label className={styles.label} htmlFor="name">Name</label>
                <input className={styles.input} type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

                <label className={styles.label} htmlFor="description">Description</label>
                <input className={styles.input} type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />


                {/* select fields */}
                <label className={styles.label} htmlFor="model">Model</label>
                <Select
                    className={styles.input}
                    value={model}
                    options={model_options}
                    onChange={setModel}
                />
                <label className={styles.label} htmlFor="color">Color</label>
                <Select
                    className={styles.input}
                    options={color_options}
                    value={color}
                    onChange={setColor}
                />
                <label className={styles.label} htmlFor="warranty">Warranty Status</label>
                <Select
                    className={styles.input}
                    options={[{ label: "Yes", options: [] }, { label: "No", options: [] }]}
                    value={warranty}
                    onChange={setWarranty}
                />
                <label className={styles.label} htmlFor="categories">Categories</label>
                <Select
                    className={styles.input}
                    isMulti
                    options={category_options}
                    value={category_slugs}
                    onChange={setCategorySlugs}
                />

                {/* numberic values */}
                <label className={styles.label} htmlFor="price">Initial Price</label>
                <input className={styles.input} type="number" id="price" value={initial_price} onChange={e => setInitialPrice(e.target.valueAsNumber)} />

                <label className={styles.label} htmlFor="stock">Stock Quantity</label>
                <input className={styles.input} type="number" id="stock" value={stock_quantity} onChange={e => setStockQuantity(e.target.valueAsNumber)} />

                <label className={styles.label} htmlFor="expense">Expense</label>
                <input className={styles.input} type="number" id="expense" value={expense} onChange={e => setExpense(e.target.valueAsNumber)} />

                {/* image */}
                <label className={styles.label} htmlFor="imageName">Image Name</label>
                <input className={styles.input} type="text" id="imageName" value={imageName} onChange={e => setImageName(e.target.value)} />

                <label className={styles.label} htmlFor="imageFile">Product Image</label>
                <input className={styles.input} type="file" name="image_file" id="imageFile" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                    }
                    return;
                }} />

                <button className={styles.button} type="submit">Add Product</button>
            </form>
        </div>
    );


}



export { AddProductForm }