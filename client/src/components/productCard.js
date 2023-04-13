import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative h-40">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <a>
            <h2 className="font-semibold text-gray-800">{product.name}</h2>
          </a>
        </Link>
        <p className="text-gray-500">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="font-semibold text-gray-800">${product.price}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}