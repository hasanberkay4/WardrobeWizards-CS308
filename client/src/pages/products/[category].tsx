import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Product } from "../../types/productType";
import ProductListView from '../../components/productList/ProductList';


type Props = {
  productList: Product[];
};

export default function ProductsPage({ productList }: Props) {

  const [clientSideProductList, setClientSideProductList] = useState<Product[]>([]);

  useEffect(() => {
    setClientSideProductList(productList);
  }, [productList]);

  return (
    <>
      {clientSideProductList.length > 0 && (
        <ProductListView key="product-list-view" products={clientSideProductList} />
      )}
    </>
  );

}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

  const categorySlug = context.params?.category ?? '';
  let url = 'http://localhost:5001/products/';

  if (categorySlug === '') {
    url = 'http://localhost:5001/products/';
  } else {
    url = `http://localhost:5001/products/categories/${categorySlug}`;
  }

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const productList = await result.json();

  productList.map((product: Product) => {
    const productName = product.image;
    product.image = `http://localhost:5001/images/${productName}`
  });

  return {
    props: {
      productList,
    },
  };
};
