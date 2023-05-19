/* eslint-disable react/jsx-key */

import { useState } from "react";
import { Delivery, DeliveryProduct } from "../../types/delivery";
import { FaStar, FaCommentAlt } from "react-icons/fa";
import axios from "axios";

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

let color: string;

const ProfileDeliveries = ({
  deliveries: initialDeliveries,
}: DeliveryProps) => {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const handleCancelDelivery = async (deliveryId: string, products: any) => {
    try {
      // change the status of delivery to cancelled
      const response = await axios.post(
        `http://localhost:5001/products/delivery/update-status`,
        {
          deliveryId: deliveryId,
          status: "cancelled",
        }
      );

      if (response.status === 200) {
        setDeliveries(
          deliveries.map((delivery) =>
            delivery._id === deliveryId
              ? { ...delivery, status: "cancelled" , totalPrice:0}
              : delivery
          )
        );

        // for each product in the delivery, decrease the stock count
        products.forEach(async (product: any) => {
          await axios.post(`http://localhost:5001/products/update-stock`, {
            prodId: product.productId,
            stock: product.quantity,
            isIncrease: true,
          });
        });
      }
    } catch (err) {
      console.error("Failed to cancel delivery: ", err);
    }
  };

  const handleRefundDelivery = async (
    deliveryId: string,
    productId: string
  ) => {
    try {
      // change the status of delivery to cancelled
      const response = await axios.post(
        `http://localhost:5001/products/delivery/product/update-status`,
        {
          deliveryId: deliveryId,
          prodId: productId,
          status: "pending-refund",
        }
      );

      if (response.status === 200) {
        setDeliveries(
          deliveries.map((delivery) => {
            if (delivery._id === deliveryId) {
              const updatedProducts = delivery.products.map((product) => {
                // Check if the product matches the desired condition for updating its status
                if (product.productId == productId) {
                  // Update the status of the product
                  return { ...product, status: "pending-refund" };
                }
                return product; // Return the product as is
              });

              // Return the updated delivery object with the modified products array
              return { ...delivery, products: updatedProducts };
            }
            return delivery; // Return the delivery as is
          })
        );
      }
    } catch (err) {
      console.error("Failed to refund delivery: ", err);
    }
  };

  return (
    <div className="parent-container">
      {deliveries.map((delivery: Delivery) => {
        return (
          <div
            key={delivery._id}
            className="hover:bg-gray-100 hover:shadow-lg w-full ml-5 mr-5 mb-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
              {new Date(delivery.date).toLocaleString("en-GB")}
            </p>

            {delivery.products.map((product: DeliveryProduct) => {
              return (
                <div className="flex items-center" key={product.productId}>
                  <a
                    href={`http://localhost:3000/products/id/${product.productId}`}
                    className={`hover:font-bold mt-2 text-gray-800 dark:text-gray-400 ${
                        product.status === "refunded" || delivery.status === "cancelled"
                          ? "line-through"
                          : ""
                      }`}
                  >
                    {"-" +
                      product.name +
                      " (" +
                      product.quantity +
                      " x " +
                      product.price +
                      " TL)"}
                  </a>
                  {(delivery.status == "delivered" ) ? (
                    <div className="flex">
                        {
                            (delivery.status == "delivered" &&( product.status == ""|| product.status=="rejected-refund")) &&(                      <a
                                className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-500 hover:text-blue-700"
                                href={`http://localhost:3000/profile/rating/${product.productId}`}
                              >
                                <FaCommentAlt className="w-5 ml-2 h-auto text-orange-300 hover:text-orange-500 transition-colors duration-300" />
                              </a>)


                        }

                      {(product.status === "" && delivery.date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ? (
                        <button
                          onClick={() =>
                            handleRefundDelivery(
                              delivery._id,
                              product.productId
                            )
                          }
                          className="ml-4 mt-2 px-2 py-1 text-sm text-red-600 font-bold bg-red-500 hover:bg-red-700 text-white rounded"
                        >
                          Refund
                        </button>
                      ) : (
                        <div>
                          <p className="ml-4 mt-2 px-2 py-1 text-red-500">
                            {product.status === "pending-refund" &&
                              "pending refund approval"}
                            {product.status === "refunded" && "refunded"}
                            {product.status === "rejected-refund" && "refund rejected"}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
            <div className="item-center flex">
              <p
                className={`mt-2 font-bold text-green-700 dark:text-green-400`}
              >
                {"Total Price: " + delivery.totalPrice + " TL"}
              </p>

              <p
                className={`mt-2 ml-7 font-bold dark:text-green-400 ${(color =
                  delivery.status == "delivered"
                    ? "text-green-600"
                    : "")} ${(color =
                  delivery.status == "intransit"
                    ? "text-orange-600"
                    : "")} ${(color =
                  delivery.status == "processing" ? "text-red-600" : "")}`}
              >
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
           

              {/* Cancel delivery button */}
              {delivery.status === "processing" && (
                <button
                  onClick={() =>
                    handleCancelDelivery(delivery._id, delivery.products)
                  }
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel Delivery
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileDeliveries;
