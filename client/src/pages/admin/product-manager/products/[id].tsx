import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import styles from '../../../../styles/ProductManagerProductPage.module.scss'
import { useState } from "react"
import { useRouter } from "next/router"
import { Product } from '../../../../types/productType';

type Props = {
    product_info: Product
}

const ProductManagerProductsPage = ({ product_info }: Props) => {

    const [stock, setStock] = useState<number>(product_info.stock_quantity);
    const [currentStock, setCurrentStock] = useState<number>(product_info.stock_quantity);

    const router = useRouter();

    const toggleStock = async (newStock: number) => {
        const response = await fetch(`http://localhost:5001/admin/products/${product_info._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stock_quantity: newStock })
        });

        if (response.ok) {
            const responseJson = await response.json();
            setStock(responseJson.product.stock_quantity);
            setCurrentStock(responseJson.product.stock_quantity);
        } else {
            // handle error
            console.error("Error updating product stock");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStock(parseInt(event.target.value));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        toggleStock(stock);
    };

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5001/admin/products/${product_info._id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const responseJson = await response.json();
            console.log(responseJson);
            alert("Product successfully deleted");
            router.push('/admin/product-manager/products');
        } else {
            // handle error
            console.error("Error deleting product");
        }
    };

    return (
        <div>
            <AdminLayout>
                <ProductManagerLayout>
                    <div className={styles.productItem}>
                        <p>{product_info.name}</p>
                        <p>{product_info.initial_price}</p>
                        <p>{product_info.category_ids.join(', ')}</p>
                        <p>{currentStock}</p>
                        {/* update stock form */}
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="stock">Stock</label>
                                <input type="number" id="stock" name="stock" value={stock} onChange={handleChange} />
                                <button type="submit">Update Stock</button>
                            </form>
                        </div>

                        {/* delete product button */}
                        <div>
                            <button onClick={handleDelete}>Delete Product</button>
                        </div>
                    </div>
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    try {
        // get product id from url
        const id = context.params?.id ?? '';

        // fetch product info
        const response = await fetch(`http://localhost:5001/admin/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // convert response to json
        const product_response = await response.json();

        // make sure response is of type ProductType
        const product = product_response.product as Product;

        return {
            props: { product_info: product }
        }
    }

    catch (err) {
        console.log(err)
        return {
            props: {
                product_info: {},
            }
        }
    }
}

export default ProductManagerProductsPage
