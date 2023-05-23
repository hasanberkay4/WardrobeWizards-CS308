/* eslint-disable @next/next/no-img-element */
import { Product } from "../../types/productType";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../context/Store";
import { ActionKind, CartItem } from "../../types/shoppingCart";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

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
  return (
    <div className="flex">
      <p className="text-3xl text-gray-900 mr-2">{rating.toFixed(2)}</p>
      {stars}
    </div>
  );
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
    quantity: 1,
    discountRate: product.discountRate,
  };

  const discountedPrice = product.discountRate
  ? product.initial_price - product.initial_price * (product.discountRate / 100)
  : product.initial_price;

  const [isInWishlist, setIsInWishlist] = useState<boolean | null>(null);

  const checkWishlist = async () => {
    try {
      const token = Cookies.get("token");
      const { user_id } = jwt_decode(token!) as { user_id: string };
      const response = await axios.post(
        "http://localhost:5001/products/check-user-wishes",
        {
          product: product._id,
          customer: user_id,
        }
      );

      if (response.status === 200) {
        const { status } = response.data;
        setIsInWishlist(status === "Product already in wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkWishlist();
  }, []);

  const addToCartHandler = () => {
  const existItem = state.cart.cartItems.find((x) => x.slug === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;

  if (product.stock_quantity < quantity) {
    alert("Sorry. Product is out of stock");
    return;
  }

  const cartItem: CartItem = {
    ...itemFromProduct,
    quantity,
    price: product.discountRate
      ? discountedPrice // Apply discounted price
      : itemFromProduct.price, // Use original price
  };

  dispatch({
    type: ActionKind.CART_ADD_ITEM,
    payload: cartItem,
  });
  alert("Product added to cart");
};

  const addWishHandler = async () => {
    try {
      const token = Cookies.get("token");
      const { user_id } = jwt_decode(token!) as { user_id: string };

      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete("http://localhost:5001/products/remove-wish", {
          data: {
            product: product._id,
            customer: user_id,
          },
        });
        setIsInWishlist(false);
        alert("Product removed from wishlist");
      } else {
        // Add to wishlist
        await axios.put("http://localhost:5001/products/add-wish", {
          product: product._id,
          customer: user_id,
        });
        setIsInWishlist(true);
        alert("Product successfully added to wishlist");
      }
    } catch (error) {
      alert(error);
    }
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
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-6">
              {product.name}
            </h1>

            <div className="py-10 lg:col-start-1">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900 mb-6">
                    {product.description}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-3">
                  <p className="text-base text-gray-900 mb-2">
                    <span className="font-bold">Model:</span> {product.model}
                  </p>
                  <p className="text-base text-gray-900 mb-10">
                    <span className="font-bold">Color:</span> {product.color}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                {product.stock_quantity > 5 && (
                  <p className="text-base text-green-500 mb-6">In Stock</p>
                )}
                {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                  <p className="text-base text-red-500 mb-6">
                    Critical Stock {product.stock_quantity}
                  </p>
                )}
                {product.stock_quantity === 0 && (
                  <p className="text-base font-bold text-black mb-6">
                    Out of Stock
                  </p>
                )}
              </div>

              <div className="space-y-6">
                <StarRating rating={product.rating} />
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900 mb-6">
                {product.discountRate ? (
                  <span className="line-through text-red-500 mr-2">
                    {product.initial_price} TL
                  </span>
                ) : null}
                {discountedPrice.toFixed(2)} TL
              </p>

              {/* Add to bag */}
              <form className="mt-1">
                <button
                  onClick={addToCartHandler}
                  type="button"
                  disabled={product.stock_quantity === 0}
                  className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    product.stock_quantity === 0
                      ? "bg-gray-500 opacity-50 line-through cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Add to bag
                </button>
              </form>

              {/* Add to wishlist */}
              {isInWishlist !== null && !isInWishlist && (
                <form className="mt-4">
                  <button
                    onClick={addWishHandler}
                    type="button"
                    className={`flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      isInWishlist
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    Add to wishlist
                  </button>
                </form>
              )}
              
              {isInWishlist !== null && isInWishlist && (
                <form className="mt-4">
                  <button
                    onClick={addWishHandler}
                    type="button"
                    className={`flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      isInWishlist
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    Remove from wishlist
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
