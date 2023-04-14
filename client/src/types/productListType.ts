export type ProductListItem = {
    name: string;
    price: number;
    imageUrl: string;
    color: string;
}

export type ProductList = {
    productList: ProductListItem[]
}
