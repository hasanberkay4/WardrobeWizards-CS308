import React from 'react';

const NotificationsWindow = () => {
  const notifications = [
    {
      id: 1,
      title: 'New Message',
      message: 'You have received a new message.',
      timestamp: 'May 20, 2023 09:30 AM',
    },
    {
      id: 2,
      title: 'New Order',
      message: 'You have a new order. Check it out!',
      timestamp: 'May 19, 2023 02:15 PM',
    },
    {
      id: 3,
      title: 'Promotion',
      message: 'Don\'t miss our special promotion',
      timestamp: 'May 18, 2023 10:45 AM',
    },
  ];

  return (
    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-72">
      {notifications.map(notification => (
        <div key={notification.id} className="mb-4">
          <h4 className="font-bold">{notification.title}</h4>
          <p className="text-sm">{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsWindow;