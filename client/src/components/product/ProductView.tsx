/* eslint-disable @next/next/no-img-element */
import { Product } from "../../types/productType";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../../context/Store";
import { ActionKind, CartItem } from "../../types/shoppingCart";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type Props = {
    product: Product;
};

const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<AiFillStar key={i} size={40} color="#FBBF24" />);
        } else {
            stars.push(<AiOutlineStar key={i} size={40} color="#FBBF24" />);
        }
    }
    return <div className="flex">{stars}</div>;
};

export default function ProductView({ product }: Props) {

    const { state, dispatch } = useContext(Store);
    const itemFromProduct: CartItem = {
        name: product.name,
        slug: product._id,
        price: product.initial_price,
        image: product.image,
        countInStock: product.stock_quantity,
        description: product.description,
        quantity: 1
    }

    const addToCartHandler = () => {

        const existItem = state.cart.cartItems.find((x) => x.slug === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.stock_quantity < quantity) {
            alert('Sorry. Product is out of stock');
            return;
        }

        dispatch({ type: ActionKind.CART_ADD_ITEM, payload: { ...itemFromProduct, quantity } });
        alert('Product added to cart')
    };

    const updateCartHandler = (item: CartItem, qty: string) => {
        const quantity = Number(qty);
        dispatch({ type: ActionKind.CART_ADD_ITEM, payload: { ...item, quantity } });
    };

    return (
        <div className="bg-white">
            <div className="pt-6">
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">

                    {/* Image gallery */}
                    <div className="aspect-h-10 aspect-w-9 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            src={product.image}
                            alt={product.image}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-6">{product.name}</h1>

                        <div className="py-10 lg:col-start-1">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900 mb-6">{product.description}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900 mb-6"><span className="font-bold">Model:</span> {product.model}</p>
                                    <p className="text-base text-gray-900 mb-6"><span className="font-bold">Color:</span> {product.color}</p>


                                </div>
                            </div>
                            <div className="space-y-6">
                                {product.stock_quantity > 5 && (
                                    <p className="text-base text-gray-900 mb-6">In Stock</p>
                                )}
                                {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                                    <p className="text-base text-red-500 mb-6">Critical Stock {product.stock_quantity}</p>
                                )}
                                {product.stock_quantity === 0 && (
                                    <p className="text-base font-bold text-black mb-6">Out of Stock</p>
                                )}
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex flex-col mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900 mb-6">{product.initial_price} TL</p>

                            {/* Add to bag */}
                            <form className="mt-10">
                                <button
                                    onClick={addToCartHandler}
                                    type="button"
                                    disabled={product.stock_quantity === 0}
                                    className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${product.stock_quantity === 0 ? 'bg-gray-500 opacity-50 line-through cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                >
                                    Add to bag
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}