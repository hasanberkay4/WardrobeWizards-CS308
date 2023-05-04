import { GetServerSideProps } from 'next';
import { Product } from "../../../types/productType";
import { commentListItem } from "../../../types/commentListType"
import axios, { AxiosResponse } from 'axios';
import ProductView from '../../../components/product/ProductView';
import { useState, useEffect } from 'react';
import Comment from '../../../components/product/Comments';
import CommentList from '../../../components/product/CommentList';

type ProductProps = {
    product: Product;
    commentItems: commentListItem[]

};




export default function ProductPage({ product, commentItems }: ProductProps) {

    return (
        <div>
            <ProductView product={product} />
            <CommentList CommentItems={commentItems}></CommentList>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProductProps> = async (context) => {
    const { req } = context;
    const productId = context.params?.productId ?? '';

    const productResponse = await fetch(`http://localhost:5001/products/id/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const commentResponse = await fetch(`http://localhost:5001/comments/productId/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });




    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent(`http://localhost:5001/products/id/${productId}`);
    const targetUrlComment = encodeURIComponent(`http://localhost:5001/comments/productId/${productId}`);

    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);
    const apiUrlComment = new URL(`/api/proxy?targetUrl=${targetUrlComment}`, `${protocol}://${host}`);


    // Fetch data from the custom API route
    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const resComment: AxiosResponse = await axios.get(apiUrlComment.toString());
    const product = res.data;
    const comments = resComment.data;

    const imageCategory = product.category;
    const imageName = product.image;
    product.image = `http://localhost:5001/images/${imageName}`
    let commentItems: commentListItem[]
    commentItems = comments


    return {
        props: {
            product,
            commentItems,

        },
    };
};
