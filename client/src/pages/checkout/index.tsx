import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../context/Store';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ActionKind, CartItem, Cart } from "../../types/shoppingCart"

const CheckoutPage = () => {
  const router = useRouter();
  const subtotal = router.query.subtotal;

  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  // not working - needs onChange
  const [paymentAddress, setPaymentAddress] = useState('');

  const handlePaymentAddressChange = () => {

  }


  useEffect(() => {
    const authToken = Cookies.get('token');
    const cart = Cookies.get('cart') || '{}';

    if (authToken === '' || !authToken) {
      // alert("You must be logged in to checkout")
      router.push('/auth/sign-in');
    }

    let parsedCart;
    try {
      parsedCart = JSON.parse(cart);
    } catch (error) {
      console.error('Error parsing cart JSON:', error);
    }

    if (!parsedCart || !parsedCart.cartItems || parsedCart.cartItems.length === 0) {
      router.push('/');
    }

  }, []);



  interface DecodedToken {
    user_id: string;
  }

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const paymentAddressInput = e.currentTarget.querySelector('input[name="payment_address"]');

    if (!paymentAddressInput) {
      console.error('Payment address input not found');
      return;
    }

    setPaymentAddress((paymentAddressInput as HTMLInputElement).value)
    const authToken = Cookies.get('token');

    if (authToken === '' || !authToken) {
      console.error('Authentication token is missing');
      return;
    }
    const decodedToken = jwt_decode(authToken!) as DecodedToken;
    const userId = decodedToken.user_id;
    console.log("usedId", userId);

    const products = cartItems.map((item) => ({
      productId: item.slug,
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: item.quantity
    }));

    const delivery = {
      customerId: userId,
      quantity: products.reduce((total, product) => total + product.quantity, 0),
      totalPrice: subtotal,
      status: 'processing',
      date: new Date().toISOString(),
      products,
      deliveryAddress: paymentAddress
    };
    const removeItemHandler = (item: CartItem) => {
      dispatch({ type: ActionKind.CART_REMOVE_ITEM, payload: item });
    };


    try {
      const invoiceResponse = await axios.post('http://localhost:5001/products/delivery', {
        delivery
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      router.push(`/checkout/order_success?q=${invoiceResponse.data}`);

      { cartItems.map((item) => removeItemHandler(item)) }


      await axios.post(`http://localhost:5001/transaction/add`, {
        amount: subtotal,
        type: "income",
      });


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="leading-loose">
      <h2 className="mb-4 text-xl text-center mt-8">Enter Your Payment Details</h2>
      <div className="flex justify-center ">
        <form className="w-1/2 m-4 p-16 bg-white rounded shadow-xl" onSubmit={handlePaymentSubmit}>
          <div className="mt-4">
            <label className="block text-sm text-gray-600" htmlFor="payment_address">Payment Address</label>
            <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="payment_address"
              name="payment_address"
              type="text"
              placeholder="Payment Address"
              aria-label="Payment Address"
              required
              value={paymentAddress}
              onChange={(e) => setPaymentAddress(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-semibold">Payment Information</h3>

          <div className="" >
            <label className="block text-sm text-gray-600" htmlFor="cus_name">Card</label>
            <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" placeholder="Card Number MM/YY CVC" aria-label="Name" required />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="hidden block text-sm text-gray-600" htmlFor="cus_email">CVV</label>
            <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" placeholder="CVC" aria-label="Email" required />
          </div>
          <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label className="hidden block text-sm text-gray-600" htmlFor="cus_email">Card Expiration </label>
            <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="date" placeholder="/ /" aria-label="Email" required />
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div>
            <p className="mb-4 pt-10 font-bold">Total: {subtotal} TL</p>
          </div>
          <div className="mt-8 flex justify-center">

            <button className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700" type="submit">Complete Payment</button>

          </div>

        </form>

      </div>

    </div>
  );
};


const DynamicCheckoutPage = dynamic(() => Promise.resolve(CheckoutPage), {
  ssr: false,
});

export default DynamicCheckoutPage;
