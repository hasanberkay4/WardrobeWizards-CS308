import React,{ useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout";
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout";
const SetDiscountPage = () => {
    const router = useRouter();
    const { id, initialPrice } = router.query;
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);
    const [currentPrice, setCurrentPrice] = useState<number>(parseInt(initialPrice as string));
  
    const setDiscount = async (discountPercentage: number) => {
     // const newPrice = currentPrice - currentPrice * (discountPercentage / 100);
  
      const response = await fetch(`http://localhost:5001/admin/sales-manager/products/${id}/discount`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discountPercentage , id }),
      });
  
      if (response.ok) {
        alert("Discount set successfully");
        console.log("Discount set successfully");
      } else {
        console.error("Error updating product price");
      }
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      setDiscount(discountPercentage);
    };
  
    return (
      <AdminLayout>
        <SalesManagerLayout>
          <h1>Set New Price for Product </h1>
          <form onSubmit={handleSubmit}>
            <p> Initial Price: {currentPrice} TL </p>
            <label>
              Set Discount Percentage:
              <input
                type="number"
                value={discountPercentage}
                onChange={(event) => setDiscountPercentage(parseInt(event.target.value))}
              />
            </label>
            <br />
            <button
              type="submit"
              style={{
                backgroundColor: "rgb(84 77 77)",
                color: "#fff",
                width: "20%",
                borderRadius: "6px",
              }}
            >
              Set Discount
            </button>
          </form>
        </SalesManagerLayout>
      </AdminLayout>
    );
  };

export default SetDiscountPage;
