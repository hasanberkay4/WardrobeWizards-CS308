export type WishProduct = {
    _id: string;
    name: string;
    description: string;
    image: string;
    stock_quantity: number;
}

export type Product = {
    _id: string
    name: string;
    description: string;
    model: string;
    color: string
    number: number;
    stock_quantity: number;
    initial_price: number;
    category_ids: string[];
    image: string;
    popularity: number;
    rating: number;
    number_of_voters: number;
    onSale: boolean;
    discountRate: number;
};


