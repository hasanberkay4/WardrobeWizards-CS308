import { Product } from "../../types/productType";

const handleSearchSubmit = async (searchTerm: string) => {
    try {
        const response = await fetch(`http://localhost:5001/products/search?q=${searchTerm}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error submitting search");
        }
        const data = await response.json();

        if (data) {
            data.map((product: Product) => {
                const productName = product.image;
                // product.image = `http://localhost:5001/images/${productName}`
            });
            return (data as Array<Product>);
        } else {
            return [];
        }

    } catch (error) {
        console.error("Error:", error);
    }
};

export { handleSearchSubmit } 