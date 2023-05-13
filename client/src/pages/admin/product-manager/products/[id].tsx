import { GetServerSideProps } from "next"
import { ProductManagerLayout } from "../../../../components/admin/product-manager/ProductManagerLayout"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import styles from '../../../../styles/ProductManagerProductPage.module.scss'
import { useState } from "react"

export type ProductManagerProductPageProps = {
    product_info: {
        _id: string,
        name: string,
        initial_price: number,
        category_ids: Array<string>,
        stock_quantity: number,
    }
}

const ProductManagerProductsPage = ({ product_info }: ProductManagerProductPageProps) => {

    const [stock, setStock] = useState<number>(product_info.stock_quantity);
    const [currentStock, setCurrentStock] = useState<number>(product_info.stock_quantity);

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
                    </div>
                </ProductManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProductManagerProductPageProps> = async (context) => {
    const id = context.params?.id ?? '';

    const response = await fetch(`http://localhost:5001/admin/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const product_info = await response.json();

    return {
        props: {
            product_info: product_info.product,
        }
    }
}

export default ProductManagerProductsPage
