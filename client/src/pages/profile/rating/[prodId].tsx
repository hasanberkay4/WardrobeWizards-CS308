/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Product } from "../../../types/productType";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import cookie from "cookie";
import axios, { AxiosResponse } from "axios";
import { isEmpty } from "lodash";


type PopupProps = {
    onClose: () => void;
    children: React.ReactNode;
};

interface DecodedToken {
    user_id: string;
}



const Popup = ({ onClose, children }: PopupProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="relative w-96 p-6 bg-white rounded-md shadow-lg">
                {children}
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: any) => {
    // get user profile info
    const { req } = context;
    const productId = context.params?.prodId ?? "";

    // Get the authentication token from cookies
    const cookies = cookie.parse(req.headers.cookie || "");
    const authToken = cookies["token"];

    if (!authToken) {
        console.error("Authentication token is missing");
        return {
            props: {
                deliveries: [], // return an empty deliveries array in case of missing token
            },
        };
    }

    const decodedToken = jwt_decode(authToken) as { user_id: string };
    const userId = decodedToken.user_id;
    console.log("usedId", userId);
    console.log("prodId", productId);

    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent(
        `http://localhost:5001/comments/productId/${productId}/${userId}`
    );

    // Get the absolute URL for the API route
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers["host"];
    const apiUrl = new URL(
        `/api/proxy?targetUrl=${targetUrl}`,
        `${protocol}://${host}`
    );

    // Fetch data from the custom API route
    const res: AxiosResponse = await axios.get(apiUrl.toString());

    const commentData = res.data;

   
        const comments = isEmpty(res.data)  ? true : false;

    return {
        props: { params: context.params, comments: comments , commentData : commentData},
    };
};

const RateProductPage = ({ params, comments, commentData }: any) => {
    // check whether already commented

    let userId = "";
    const router = useRouter();
    const { prodId } = params;
    console.log("ratingprodId: ", prodId);
    console.log("commentData", commentData    )
    let description;
    !isEmpty(commentData) ? description = commentData[0].description : description=""

    const isShow = (comments || description == "") ? true : false
    // comment yoksa ve description yoksa true
    // comment varsa description varsa false
    // comment varsa ve description yoksa true



    if (typeof window === "undefined") {
        // Running on the server, skip client-side code
    } else {
        const authToken = Cookies.get("token");

        if (authToken === "" || !authToken) {
            console.error("Authentication token is missing");
            return;
        }

        const decodedToken = jwt_decode(authToken) as DecodedToken;
        userId = decodedToken.user_id;
    }

    const [showPopup, setShowPopup] = useState(false);

    const [product, setProduct] = useState<Product | null>(null);

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");

    const handleClick = async () => {
        // Fetch product data from the backend

        const productId = prodId;
        const productData = await fetchProductById(productId);
        if (productData) {
            setProduct(productData);
            setShowPopup(true);
        } else {
            console.error("Product data is not available");
        }
    };

    function handleButtonClick() {
        router.push('/profile/deliveries');
    }

    const handleSubmit = () => {
        console.log("rating",rating)


            if(comments){

                if(rating==0){

                    alert('You must enter your rating to continue.');
                }else{

                    if (product) {
                        const newVoters = product.number_of_voters + 1;
                        const newaveragerating =
                            (product.rating * product.number_of_voters + rating) / newVoters;
            
                        // Update the product with the new average rating and number of voters
                        updateProductRating(product._id, newaveragerating, newVoters);
            
                        const customerId = userId; // Replace this with the actual customer ID
                        
                        submitComment(product._id, customerId, rating, comment);
            
                        // Close the popup
                        setShowPopup(false);
            
                        router.push("/profile/deliveries");
                    } else {
                        console.error("Product data is not available");
                    }


                }



            }else{

                if(product){
                    const customerId = userId; // Replace this with the actual customer ID
                    updateComment(product._id, customerId, comment);
                            
                    // Close the popup
                    setShowPopup(false);
        
                    router.push("/profile/deliveries");
    
                }else{
                    console.error("Product data is not available");

                }


                



            }




    



    };

    const updateProductRating = async (
        id: string,
        newAverageRating: number,
        newVoters: number
    ) => {
        try {
            const response = await fetch(`http://localhost:5001/products/id/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newAverageRating, newVoters }),
            });

            if (!response.ok) {
                throw new Error("Error updating product rating");
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error("Error updating product rating:", error);
        }
    };

    const submitComment = async (
        productId: string,
        customerId: string,
        rating: number,
        description: string
    ) => {
        try {
            const response = await fetch("http://localhost:5001/comments/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    customerId,
                    date: new Date(),
                    description,
                    approved: false,
                    rating,
                }),
            });

            if (!response.ok) {
                throw new Error("Error submitting comment");
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };



    const updateComment = async (
        productId: string,
        customerId: string,
 
        description: string
    ) => {
        try {
            const response = await fetch("http://localhost:5001/comments/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    customerId,
                 
                    description,
        
                    
                }),
            });

            if (!response.ok) {
                throw new Error("Error submitting comment");
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    

    const fetchProductById = async (id: string): Promise<Product | null> => {
        try {
            const response = await fetch(`http://localhost:5001/products/id/${id}`);
            if (!response.ok) {
                throw new Error("Error fetching product data");
            }
            const productData = (await response.json()) as Product;
            return productData;
        } catch (error) {
            console.error("Error fetching product data:", error);
            return null;
        }
    };

    const StarRating = ({
        rating,
        setRating,
    }: {
        rating: number;
        setRating: (rating: number) => void;
    }) => {
        const stars = [];
        const iconStyle = { color: "#FBBF24", cursor: "pointer" };

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(
                    <div key={i} onClick={() => setRating(i)}>
                        <IconContext.Provider value={{ size: "24px", ...iconStyle }}>
                            <AiFillStar />
                        </IconContext.Provider>
                    </div>
                );
            } else {
                stars.push(
                    <div key={i} onClick={() => setRating(i)}>
                        <IconContext.Provider value={{ size: "24px", ...iconStyle }}>
                            <AiOutlineStar />
                        </IconContext.Provider>
                    </div>
                );
            }
        }
        return <div className="flex">{stars}</div>;
    };

    return isShow  ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Rate Product
            </button>

            {showPopup && (
                <Popup onClose={() => setShowPopup(false)}>
                    <div className="flex flex-col items-center">
                        <button
                            className="absolute top-2 right-2 text-gray font-bold py-1 px-2 rounded"
                            onClick={() => setShowPopup(false)}
                        >
                            <AiOutlineClose />
                        </button>
                        {
                            comments && (
                                <>
                                <h2 className="text-2xl font-bold mb-4">Rate</h2>
                                <StarRating rating={rating} setRating={setRating} />
                                </>

                            )

                        }


                        <textarea
                            className="mt-4 w-full p-2 border rounded"
                            placeholder="Leave a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </Popup>
            )}
        </div>
    ) : (
        <div className="flex items-center justify-center h-screen flex-col">
            <div className="bg-red-500 text-white font-bold py-2 px-4 rounded mb-4">
                You already gave comment or rating to this product
            </div>
            <div>
                <button
                    onClick={handleButtonClick}
                    className="bg-white shadow hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-2 px-4 rounded transition duration-200"

                >
                    back to deliveries
                </button>
            </div>
        </div>
    );
};

export default RateProductPage;
