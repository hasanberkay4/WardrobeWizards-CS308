import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { Store } from '../../../context/Store';
import { CartItem } from '../../../types/shoppingCart';

const CartIcon = () => {
    const {
        state: { cart },
    } = useContext(Store);

    const cartItemsCount = cart.cartItems.reduce(
        (count: number, item: CartItem) => count + item.quantity,
        0
    );

    return (
        <div className="ml-4 flow-root lg:ml-6">
            <Link href="/shopping_cart">
                <Link href="/shopping_cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />

                    {cartItemsCount > 0 && (
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {cartItemsCount}
                        </span>
                    )}
                    <span className="sr-only">items in cart, view bag</span>
                </Link>
            </Link>
        </div>
    );
};

export default CartIcon;