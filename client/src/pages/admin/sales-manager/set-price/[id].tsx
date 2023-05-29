import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout";
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout";

const SetPricePage = () => {
  const router = useRouter();
  const { id, initialPrice } = router.query;
  const [newPrice, setNewPrice] = useState<number>(0)
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  useEffect(() => {
    if (initialPrice) {
      setCurrentPrice(parseInt(initialPrice as string));
    }
  }, [initialPrice]);


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
    <div className="grid mx-40 max-w-7xl md:grid-cols-1 md:gap-20">
      <div className="overflow-x-auto md:col-span-3">
        <h1 className="p-5 text-2xl font-bold text-left">
          Set New Price for Product
        </h1>

        <div className="border border-gray-300 p-4 rounded-md shadow-sm">
          <form onSubmit={handleSubmit} className="min-w-full">
            <div className="border-b">
               <div className="flex justify-evenly  pl-4  items-center">
                    <div className=" text-m">Initial Price:</div>
                    <div className="pl-100 ">
                      <div className="border border-gray-300 rounded-md w-40 h-10 flex items-center justify-center">
                        {currentPrice} TL
                      </div>
                    </div>
                  </div>
              <div className="flex justify-evenly p-5 items-center">
                <div className="px-4 text-m">New Price:</div>
                <div className="w-40 h-10 flex items-center justify-center">
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(event) => setNewPrice(parseInt(event.target.value))}
                    style={{
                      appearance: "textfield",
                      border: "1px solid #ccc",
                      padding: "10px 15px",
                      borderRadius: "6px",
                      width: "100%",
                      height: "100%",
                    }}
                    className="w-full text-center"
                  />
                </div>
              </div>
            </div>
            <div className="p-5 text-center">
              <button
                type="submit"
                style={{
                  backgroundColor: "rgb(84 77 77)",
                  color: "#fff",
                  width: "20%",
                  borderRadius: "6px",
                  padding: "10px",
                }}
              >
                Set New Price
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </SalesManagerLayout>
</AdminLayout>
  );
};

export default SetPricePage;
