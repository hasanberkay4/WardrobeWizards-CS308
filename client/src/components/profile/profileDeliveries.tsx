/* eslint-disable react/jsx-key */

import { Delivery, DeliveryProduct } from "../../types/delivery";
import { FaStar, FaCommentAlt } from "react-icons/fa";

export type DeliveryProps = {
    deliveries: Delivery[];
};

let index = 0;
const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};

const ProfileDeliveries = ({ deliveries }: DeliveryProps) => {
    return (
        <div className="parent-container">
            {deliveries.map((delivery: Delivery) => {
                return (
                    <div
                        key={delivery._id}
                        className="hover:bg-gray-100 hover:shadow-lg w-full ml-5 mr-5 mb-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
                    >
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            { }
                        </h3>
                        <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
                            {new Date(delivery.date).toLocaleString("en-GB")}
                        </p>

                        {delivery.products.map((product: DeliveryProduct) => {
                            return (
                                <div className="flex items-center" key={product.productId}>
                                    <a
                                        href={`http://localhost:3000/products/id/${product.productId}`}
                                        className="hover:font-bold mt-2 text-gray-800 dark:text-gray-400 italic"
                                    >
                                        {"-" + product.name + "(" + product.quantity + ")"}
                                    </a>

                                    <a
                                        className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-500 hover:text-blue-700"
                                        onClick={() =>
                                            window.open(
                                                `http://localhost:3000/profile/rating/${product.productId}`,
                                                "popup",
                                                "width=600,height=600"
                                            )
                                        }
                                    >
                                        <FaCommentAlt className="w-5 ml-2 h-auto text-orange-300 hover:text-orange-500 transition-colors duration-300" />
                                    </a>
                                </div>
                            );
                        })}
                        <div className="item-center flex">
                            <p className="mt-2 font-bold text-green-700 dark:text-green-400">
                                {"Total Price: " + delivery.totalPrice + " TL"}
                            </p>
                            <p className="mt-2 ml-7 font-bold text-red-600 dark:text-green-400">
                                {"Status: " + delivery.status}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <a
                                className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-500 hover:text-blue-700"
                                href={`http://localhost:5001/products/delivery/invoice/${delivery._id}`}
                            >
                                Invoice Link
                                <svg
                                    className="w-2.5 h-auto"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProfileDeliveries;
