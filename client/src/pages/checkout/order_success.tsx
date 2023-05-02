import Link from 'next/link';

const SuccessfulOrder = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Order is Placed!</h1>
      <p className="text-lg mb-4">
        Thank you for your purchase. We have received your order and it will be
        processed shortly.
      </p>
      <p className="text-lg mb-8">
        You will receive an email confirmation with your order details shortly.
      </p>
      <Link href="/">
  <div className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">
    Back to Home Page
  </div>
</Link>

    </div>
  );
};

export default SuccessfulOrder;
