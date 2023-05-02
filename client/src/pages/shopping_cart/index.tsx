import CheckoutPage from '../checkout';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { Store } from '../../context/Store';
import { useRouter } from 'next/router';
import { ActionKind, Action, CartItem, Cart } from "../../types/shoppingCart"
import dynamic from 'next/dynamic';



function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: ActionKind.CART_REMOVE_ITEM, payload: item });
  };

  const updateCartHandler = (item: CartItem, qty: string) => {
    const quantity = Number(qty);
    dispatch({ type: ActionKind.CART_ADD_ITEM, payload: { ...item, quantity } });
  };
  const subtotal = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);


  return (

    <>
      <h1 className="mb-4 text-xl text-center mt-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex justify-center">
          <Link href="/">
            <div className="max-w-2xl p-8 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300">
              Cart is empty. Go shopping
            </div>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link className="flex items-center" href={`/products/id/${item.slug}`}>

                        <img
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></img>
                        &nbsp;
                        {item.name}

                      </Link>
                    </td>

                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                {(
                  <button
                    onClick={() => router.push(`/checkout?subtotal=${subtotal}`)}
                    className="primary-button w-full"
                  >
                    Check Out
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

