import CheckoutPage from '../checkout';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
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
      <h2 className="mb-4 text-xl text-center mt-8">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="flex justify-center">
          <Link href="/">
            <div className="max-w-2xl p-8 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300">
              Cart is empty. Go shopping
            </div>
          </Link>
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="grid mx-auto max-w-7xl pl-15 md:grid-cols-1 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>

                    <th className="p-5 text-left">Item</th>

                    <th className="p-5 text-center">Quantity</th>
                    <th className="p-5 text-center">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} >
                      <Link className="flex items-center pt-10 pr-5 " href={`/products/id/${item.slug}`}>
                        <div className='pl-10'>
                          <img
                            src={item.image}
                            alt={item.name}
                            width={200}
                            height={200}
                          ></img>
                        </div>
                        &nbsp;
                        <div className='pl-10'>
                          {item.name}
                        </div>

                      </Link>

                      <td className="p-5 text-center">
                        <select
                          className="border" // Only use the border class for a square border
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

                      <td className="p-5 text-center">{item.price} TL</td>
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
            <div className="card p-5 bg-white shadow-lg rounded-lg flex flex-col justify-between">
              <div>
                <p className="mb-4 pt-10 font-bold">Total: {subtotal.toFixed(2)} TL</p>
              </div>
              <div className="border-t border-gray-300 my-4"></div>
              <div className='flex justify-between'>
                <Link href="/">
                  <div className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                  >
                    Back to Shopping
                  </div>
                </Link>
                <button
                  onClick={() => router.push(`/checkout?subtotal=${subtotal}`)}
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Check Out
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

