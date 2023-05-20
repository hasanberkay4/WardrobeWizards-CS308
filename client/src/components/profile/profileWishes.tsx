import { WishProduct } from "../../types/productType";
import { useRouter } from "next/router";

export type WishedProductsProps = {
  wishedProducts: WishProduct[];
};

const ProfileWishedProducts = ({ wishedProducts }: WishedProductsProps) => {
  const router = useRouter();

  const handleClick = (productId: string) => {
    const productPageUrl = `/products/id/${productId}`;
    router.push(productPageUrl);
  };

  return (
    <div className="parent-container">
      {wishedProducts.map((product: WishProduct) => (
        <div
          key={product._id}
          className="hover:bg-gray-100 hover:shadow-lg w-full ml-5 mr-5 mb-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
          onClick={() => handleClick(product._id)}
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{product.name}</h3>

          <div className="flex items-center">
            <img
              src={`http://localhost:5001/images/${product.image}`}
              alt={product.name}
              className="w-16 h-16 rounded-full"
            />

            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Description: {product.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Stock Quantity: {product.stock_quantity}</p>
            </div>
          </div>

          {/* Add more product details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ProfileWishedProducts;
