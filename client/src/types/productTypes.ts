export type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    color: string;
    size: string;
    stock: number;
    highlights: [string];
    details: string;
};

export type ProductListItem = {
    id: number
}

export type ProductList = {
    productList: ProductListItem[]
}