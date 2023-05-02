import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../context/Store';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const CheckoutPage = () => {

  const router = useRouter();
  const subtotalParam = router.query.subtotal;
  const subtotal = parseFloat(
    Array.isArray(subtotalParam) ? subtotalParam[0] : subtotalParam || '0'
  );

  const { state } = useContext(Store);
  const { cart: { cartItems } } = state;
  useEffect(() => {
    const authToken = Cookies.get('token');

    if (authToken === '' || !authToken) {
      router.push('/auth/sign-in');
    }
  }, []);

  interface DecodedToken {
    user_id: string;
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      description: 'black pants',
      quantity: item.quantity
    }));

    const delivery = {
      customerId: userId,
      quantity: products.reduce((total, product) => total + product.quantity, 0),
      totalPrice: subtotal,
      status: 'pending',
      date: new Date().toISOString(),
      products
    };

    try {
      await axios.post('http://localhost:5001/products/delivery', {
        delivery
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      router.push('/checkout/order_success');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="leading-loose">
      <div className="flex justify-center  mt-16">
        <form className="w-1/4 m-4 p-10 bg-white rounded shadow-xl" onSubmit={handlePaymentSubmit}>
          <h3 className="text-lg font-semibold">Payment Information</h3>

          <div className="" >
            <label className="block text-sm text-gray-600" htmlFor="cus_name">Card</label>
            <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" placeholder="Card Number MM/YY CVC" aria-label="Name" />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="hidden block text-sm text-gray-600" htmlFor="cus_email">CVV</label>
            <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" placeholder="CVC" aria-label="Email" />
          </div>
          <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label className="hidden block text-sm text-gray-600" htmlFor="cus_email">Card Expiration </label>
            <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="date" placeholder="/ /" aria-label="Email" />
          </div>
          <div className="mt-16">
            <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Complete Payment</button>
          </div>
        </form>
        <div className="w-1/4 m-4 p-10 bg-white rounded shadow-xl">
          <h3 className="text-lg font-semibold">Item Summary</h3>
          <div>

          </div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.slug} className="flex justify-between mt-2 items-center">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={100} // Increase width
                    height={100} // Increase height
                    className="mr-2 mb-4"
                  />
                  <span className='ml-16'>{item.name}</span>
                </div>
                <span>
                  <span className="font-bold">{item.quantity} x $</span>
                  <span className="font-bold">{item.price}</span>
                </span>
              </li>
            ))}
            <div className="border-t border-gray-300 my-4"></div>
            <div className="mt-4">
              <p className="mt-8">
                <span className="font-bold">Total Price{subtotal}$</span>
              </p>
            </div>

          </ul>
        </div>

      </div>

    </div>
  );
};






const DynamicCheckoutPage = dynamic(() => Promise.resolve(CheckoutPage), {
  ssr: false,
});

export default DynamicCheckoutPage;
