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

  const isDiscounted = product_data.discountRate > 0;

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
      const response = await fetch(`http://localhost:5001/admin/sales-manager/remove-discount/${product_data._id}`, {
        method: 'PUT'
      });

      if (response.ok) {
        alert('Discount removed');
      } else {
        console.error('Failed to remove discount');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

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
        {isDiscounted && (
          <p className="font-medium text-blue-500">Discount is already applied</p>
        )}
        {isDiscounted && (
          <p>Discount Rate: {product_data.discountRate}%</p>
        )}
        <p>Name: {product_data.name}</p>
        <p>Initial Price: {product_data.initial_price}TL</p>
        <p>Category(s): {product_data.category_ids}</p>

        <img
          src={product_data.image}
          alt={product_data.image}
          className="w-64 h-64 object-cover object-center"
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
