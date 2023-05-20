import { GetServerSideProps } from "next";
import SalesManagerDeliveries from "../../../../components/admin/sales-manager/SalesManagerDeliveries";

import axios, { AxiosResponse } from "axios";
import { Delivery } from "../../../../types/delivery";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import cookie from "cookie";
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout";
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout";

type DeliveryProps = {
  deliveries: Delivery[];
};

export default function SalesManagerDeliveriesPage({
  deliveries,
}: DeliveryProps) {
  return (
    <div>
      <AdminLayout>
        <SalesManagerLayout>
          <h1 className="text-3xl font-bold ml-7 mb-5">Deliveries</h1>
          <SalesManagerDeliveries deliveries={deliveries} />
        </SalesManagerLayout>
      </AdminLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<DeliveryProps> = async (
  context
) => {
  // get user profile info
  const { req } = context;

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



  // The target API endpoint you want to proxy
  const targetUrl = encodeURIComponent(
    `http://localhost:5001/products/delivery/`
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

  const deliveries = res.data;

  return {
    props: {
      deliveries,
    },
  };
};
