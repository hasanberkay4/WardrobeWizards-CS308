import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/Auth';
import jwt_decode from 'jwt-decode';

interface Notification {
  _id: string;
  customer: string;
  content: string;
  createdAt: string;
  product: string;
}

const NotificationsWindow = () => {
  const { token } = useAuth();
  const { user_id } = jwt_decode(token!) as { user_id: string };
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:5001/products/get-user-notifies/${user_id}`); 
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user_id]);

  if (!token) {
    return null;
  }

  return (
    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-72">
      {notifications.map((notification, index) => (
        <React.Fragment key={notification._id}>
          <a
            href={`http://localhost:3000/products/id/${notification.product}`}
            className="block hover:underline"
          >
            <h4 className="font-bold">Promotion</h4>
            <p className="text-sm">{notification.content}</p>
            <p className="text-xs text-gray-500">{notification.createdAt}</p>
          </a>
          {index !== notifications.length - 1 && <hr className="my-4 border-gray-300" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default NotificationsWindow;
