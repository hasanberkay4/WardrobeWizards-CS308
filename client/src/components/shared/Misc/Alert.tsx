import React from 'react';

interface AlertProps {
    type: 'error' | 'success' | 'warning';
    message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
    const getColorClass = () => {
        switch (type) {
            case 'error':
                return 'bg-red-500 text-white';
            case 'success':
                return 'bg-green-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className={`px-4 py-2 rounded-md ${getColorClass()}`}>
            {message}
        </div>
    );
};

export default Alert;
