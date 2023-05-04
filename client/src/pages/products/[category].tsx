import { GetServerSideProps } from 'next';
import { Product } from "../../types/productType";

import ProductListView from '../../components/productList/ProductList';

import { useEffect, useState } from 'react';


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
  const { req } = context;
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
    const productCategory = product.category;
    const productName = product.image;
    product.image = `http://localhost:5001/images/${productName}`
  });


  // old code
  /*
  // The target API endpoint you want to proxy, including the category slug
  const targetUrl = encodeURIComponent(`http://localhost:5001/products/categories/${categorySlug}`);
  console.log(targetUrl);
  // Get the absolute URL for the API route
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers['host'];
  const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);

  // Fetch data from the custom API route
  const res: AxiosResponse = await axios.get(apiUrl.toString());
  const productList = res.data;
  productList.map((product: Product) => {
    const productCategory = product.category;
    const productName = product.image;
    product.image = `http://localhost:5001/images/${productName}`
  })
  */

  return {
    props: {
      productList,
    },
  };
};
