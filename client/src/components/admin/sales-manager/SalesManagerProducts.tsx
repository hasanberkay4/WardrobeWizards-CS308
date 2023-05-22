import Link from "next/link";
import styles from "../../../styles/ProductManagerFeatureCart.module.scss";
import { Product } from "../../../types/productType";
import { useRouter } from "next/router";

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

  return (
    <div className={styles.cartItem}>
      Product:
      <div
        className={styles.content}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
        }}
      >
        <p
          className={`text-sm font-medium ${
            product_data.discountRate > 0 ? "text-red-500" : "text-gray-900"
          }`}
        >
        {product_data.discountRate > 0 ? ("Discount is applied") : null}
          </p>
        <p>Name : {product_data.name}</p>
        <p>Initial Price: {product_data.initial_price}TL</p>
        <p>Category(s) : {product_data.category_ids}</p>
       
        <img
          src={product_data.image}
          alt={product_data.image}
          className="w-64 h-64 object-cover object-center "
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
            onClick={() =>
              router.push(
                `/admin/sales-manager/set-price/${product_data._id}?initialPrice=${product_data.initial_price}`
              )
              
            }
          >
            Set Price
          </button>
          <button
            style={{
              backgroundColor: "rgb(84 77 77)",
              color: "#fff",
              width: "20%",
              borderRadius: "6px",
            }}
            onClick={() =>
              router.push(
                `/admin/sales-manager/set-discount/${product_data._id}?initialPrice=${product_data.initial_price}`
              )
            }
          >
            Set Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export { SalesManagerProducts };
