/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "../../../styles/ProductManagerFeatureCart.module.scss";
import { Product } from "../../../types/productType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

type ProductContent = {
  product_data: {
    _id: string;
    name: string;
    initial_price: number;
    image: any;
    discountRate: number;
    category_ids: Array<string>;
  };
};

const SalesManagerProducts = ({ product_data }: ProductContent) => {
  const router = useRouter();

  let isDiscounted = product_data.discountRate > 0;
  const [removedDiscount, setRemovedDiscount] = useState(false);

  let categoryNamesString = "";
  const categoryNamesConcat = product_data.category_ids.map((categoryId) => {
    categoryNamesString += categoryId + ", ";
  });

  const handleSetPrice = () => {
    router.push(
      `/admin/sales-manager/set-price/${product_data._id}?initialPrice=${product_data.initial_price}`
    );
  };

  const handleSetDiscount = () => {
    router.push(
      `/admin/sales-manager/set-discount/${product_data._id}?initialPrice=${product_data.initial_price}`
    );
  };

  const handleRemoveDiscount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/admin/sales-manager/remove-discount/${product_data._id}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Discount removed");
        router.push("/admin/sales-manager/products");
      } else {
        console.error("Failed to remove discount");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };



  useEffect(() => {

  }, [removedDiscount, isDiscounted]);

  return (
    <div className={styles.cartItem}>
      <div
        className={styles.content}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
        }}
      >
        <p>Name: {product_data.name}</p>
        {isDiscounted && (
          <p className="font-medium text-blue-500">Discount is already applied</p>
        )}
        {isDiscounted && <p>Discount Rate: {product_data.discountRate}%</p>}
        <p>Initial Price: {product_data.initial_price}TL</p>
        <p>Category(s): {categoryNamesString  /*categoryNames.join(", ")*/}</p>

        <img
          src={product_data.image}
          alt={product_data.image}
          className="w-64 h-64 object-cover object-center"
          width={200}
          height={200}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <button
            style={{
              marginBottom: "10px",
              backgroundColor: "rgb(84 77 77)",
              color: "#fff",
              width: "20%",
              borderRadius: "6px",
            }}
            onClick={handleSetPrice}
          >
            Set Price
          </button>
          {isDiscounted ? (
            <button
              style={{
                backgroundColor: "rgb(84 77 77)",
                color: "#fff",
                width: "20%",
                borderRadius: "6px",
              }}
              onClick={handleRemoveDiscount}
            >
              Remove Discount
            </button>
          ) : (
            <button
              style={{
                backgroundColor: "rgb(84 77 77)",
                color: "#fff",
                width: "20%",
                borderRadius: "6px",
              }}
              onClick={handleSetDiscount}
            >
              Set Discount
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { SalesManagerProducts };