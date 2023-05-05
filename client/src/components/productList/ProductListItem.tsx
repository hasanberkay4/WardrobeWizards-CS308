/* eslint-disable @next/next/no-img-element */
import { Product } from "../../types/productType"
import Image from 'next/image'
import Link from "next/link";

type Props = {
  product: Product
}

export function ProductListItemView({ product }: Props) {
  const stars = Array(product.rating).fill('★').join('');

  return (
    <div key={product._id} className="group relative">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.image}
          alt={product.image}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`products/id/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
          <div className="mr-2 text-yellow-400">{stars}</div>
          <div className="mr-2 text-sm text-green-500">popularity: {product.popularity}</div>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.initial_price} TL</p>
      </div>
    </div>
  );
}