import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from "../../types/productType";
import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';


type PopupProps = {
    onClose: () => void;
    children: React.ReactNode;
};

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


export default function RateProductPage() {

    const [showPopup, setShowPopup] = useState(false);

    const [product, setProduct] = useState<Product | null>(null);

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState('');

    const handleClick = async () => {
        // Fetch product data from the backend
        const productId = '643f02672b485eafeb274650';
        const productData = await fetchProductById(productId);
        if (productData) {
            setProduct(productData);
            setShowPopup(true);
        } else {
            console.error('Product data is not available');
        }
    };


    const handleSubmit = () => {
        if (product) {
            const newVoters = product.number_of_voters + 1;
            const newaveragerating = (product.rating * product.number_of_voters + rating) / newVoters;

            // Update the product with the new average rating and number of voters
            updateProductRating(product._id, newaveragerating, newVoters);

            const customerId = '643da4243e2885673bef6be5'; // Replace this with the actual customer ID
            submitComment(product._id, customerId, rating, comment);

            // Close the popup
            setShowPopup(false);
        } else {
            console.error('Product data is not available');
        }
    };


    const updateProductRating = async (id: string, newAverageRating: number, newVoters: number) => {
        try {
            const response = await fetch(`http://localhost:5001/products/id/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newAverageRating, newVoters }),
            });

            if (!response.ok) {
                throw new Error('Error updating product rating');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error updating product rating:', error);
        }
    };

    const submitComment = async (productId: string, customerId: string, rating: number, description: string) => {
        try {
            const response = await fetch('http://localhost:5001/comments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                throw new Error('Error submitting comment');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };





    const fetchProductById = async (id: string): Promise<Product | null> => {
        try {
            const response = await fetch(`http://localhost:5001/products/id/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching product data');
            }
            const productData = await response.json() as Product;
            return productData;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return null;
        }
    };






    const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
        const stars = [];
        const iconStyle = { color: '#FBBF24', cursor: 'pointer' };

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(
                    <div key={i} onClick={() => setRating(i)}>
                        <IconContext.Provider value={{ size: '24px', ...iconStyle }}>
                            <AiFillStar />
                        </IconContext.Provider>
                    </div>
                );
            } else {
                stars.push(
                    <div key={i} onClick={() => setRating(i)}>
                        <IconContext.Provider value={{ size: '24px', ...iconStyle }}>
                            <AiOutlineStar />
                        </IconContext.Provider>
                    </div>
                );
            }
        }
        return <div className="flex">{stars}</div>;
    };



    return (
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
                        <h2 className="text-2xl font-bold mb-4">Rate</h2>
                        <StarRating rating={rating} setRating={setRating} />

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
    );
}