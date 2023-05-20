import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout";
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout";

const SetPricePage = () => {
  const router = useRouter();
  const { id, initialPrice } = router.query;
  const [newPrice, setNewPrice] = useState<number>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(parseInt(initialPrice as string));
  
  const togglePrice = async (newPrice: number) => {
    const response = await fetch(`http://localhost:5001/admin/sales-manager/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  newPrice }),
    });
  
    if (response.ok) {
      const responseJson = await response.json();
      setNewPrice(responseJson.product.initial_price);
      setCurrentPrice(newPrice);
    } else {
      // handle error
      console.error("Error updating product price");
    }
  };
  
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    togglePrice(newPrice);
  };
  console.log("initialPrice", initialPrice);
  console.log("id", id);
  ;
 
 

  return (
    <AdminLayout>
      <SalesManagerLayout>
        <h1>Set New Price for Product </h1>
        <form onSubmit={handleSubmit}>
          <p> Initial Price: {currentPrice} TL </p>
          <label>
            New Price:
            <input
              type="number"
              value={newPrice}
              onChange={(event) => setNewPrice(parseInt(event.target.value))}
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
            Set New Price
          </button>
        </form>
      </SalesManagerLayout>
    </AdminLayout>
  );
};

export default SetPricePage;
