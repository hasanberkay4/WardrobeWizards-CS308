import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout";
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout";

const SetPricePage = () => {
  const router = useRouter();
  const initialPrice = router.query.initialPrice;
  const [newPrice, setNewPrice] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Here you can send the new price to the server
    console.log("New price set: ", newPrice);
  };

  return (
    <AdminLayout>
      <SalesManagerLayout>
        <h1>Set New Price for Product </h1>
        <form onSubmit={handleSubmit}>
          <label>
            Initial Price:
            <input type="number" value={initialPrice} disabled />
          </label>
          <br />
          <label>
            New Price:
            <input
              type="number"
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Set New Price" />
        </form>
      </SalesManagerLayout>
    </AdminLayout>
  );
};

export default SetPricePage;
