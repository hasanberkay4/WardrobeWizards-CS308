/* eslint-disable react/jsx-key */

import { useState } from "react";
import { Delivery, DeliveryProduct } from "../../../types/delivery";
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

function isPast30Days(date0: Date) {
  const date2 = new Date();
  const date1 = new Date(date0);
  const utcDate2 = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );
  const utcDate1 = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(utcDate2 - utcDate1);

  // Convert the difference to days
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  const isPast30Days = differenceInDays > 30 ? false : true;
  return isPast30Days;
}

const SalesManagerDeliveries = ({
  deliveries: initialDeliveries,
}: DeliveryProps) => {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const handleRefundDelivery = async (
    deliveryId: string,
    productId: string,
    decision: string,
    products: any,
    quantity: number,
    prodPrice: number,
    customerId: string
  ) => {
    try {
      // change the status of delivery to cancelled
      const refundStatus =
        decision === "accept" ? "refunded" : "rejected-refund";
      const response = await axios.post(
        `http://localhost:5001/products/delivery/product/update-status`,
        {
          deliveryId: deliveryId,
          prodId: productId,
          status: refundStatus,
        }
      );

      if (response.status === 200 && decision === "accept") {
        try {
          const stockUpdateResponse = await axios.post(`http://localhost:5001/products/update-stock`, {
            prodId: productId,
            stock: quantity,
            isIncrease: true,
          });
          console.log("Stock update response:", stockUpdateResponse.data);
    
          try {
            const addExpenseResponse = await axios.post(`http://localhost:5001/transaction/add`, {
              amount: quantity*prodPrice,
              type: "expense",
            });
            console.log("Add expense response:", addExpenseResponse.data);
    
            try {
              const walletUpdateResponse = await axios.post(`http://localhost:5001/users/user/${customerId}/wallet`, {
                amount: quantity*prodPrice
              });
              console.log("Wallet update response:", walletUpdateResponse.data);
    
            } catch (walletErr) {
              console.error("Failed to update wallet: ", walletErr);
            }
    
          } catch (expenseErr) {
            console.error("Failed to add expense: ", expenseErr);
          }
    
        } catch (stockErr) {
          console.error("Failed to update stock: ", stockErr);
        }
    }
    

      if (response.status === 200) {
        setDeliveries(
          deliveries.map((delivery) => {
            let decPrice = 0;
            if (delivery._id === deliveryId) {
              const updatedProducts = delivery.products.map((product) => {
                // Check if the product matches the desired condition for updating its status
                if (product.productId == productId) {
                  // Update the status of the product
                  if (decision === "accept") {
                    decPrice = product.price * product.quantity;
                  }

                  return { ...product, status: refundStatus };
                }
                return product; // Return the product as is
              });

              // Return the updated delivery object with the modified products array
              return {
                ...delivery,
                products: updatedProducts,
                totalPrice: delivery.totalPrice - decPrice,
              };
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
                      product.status === "refunded" ||
                      delivery.status === "cancelled"
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
                  {delivery.status == "delivered" ? (
                    <div className="flex">
                      {delivery.status == "delivered" &&
                      product.status == "pending-refund" ? (
                        <div>
                          <button
                            onClick={() =>
                              handleRefundDelivery(
                                delivery._id,
                                product.productId,
                                "accept",
                                product,
                                product.quantity,
                                product.price,
                                delivery.customerId,    
                              )
                            }
                            className="ml-4 mt-2 px-2 py-1 text-sm text-green-600 font-bold bg-green-500 hover:bg-green-700 text-white rounded"
                          >
                            Accept Refund
                          </button>
                          <button
                            onClick={() =>
                              handleRefundDelivery(
                                delivery._id,
                                product.productId,
                                "reject",
                                product,
                                product.quantity,
                                product.price,
                                delivery.customerId 
                              )
                            }
                            className="ml-4 mt-2 px-2 py-1 text-sm text-red-600 font-bold bg-red-500 hover:bg-red-700 text-white rounded"
                          >
                            Reject Refund
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="ml-4 mt-2 px-2 py-1 text-red-500">
                            {product.status === "refunded" && "refunded"}
                            {product.status === "rejected-refund" &&
                              "refund rejected"}
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SalesManagerDeliveries;
