
export type DeliveryProduct = {
    productId: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    status: string;

}

export type Delivery = {

    _id: string;
    customerId: string;
    quantity: number;
    totalPrice: number;
    deliveryAddress: string;
    status: string;
    date: Date;
    products: DeliveryProduct[];
    pdfUrl: string
}