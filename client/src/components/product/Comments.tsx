import React from 'react';

type CommentProps = {
    index: number;
    rating: number;
    comment: string;
    name: string;
    surname: string;
    date: Date;
    approved: boolean
};

const Comment: React.FC<CommentProps> = ({ index, rating, comment, name, surname,date,approved}) => {
  const stars = Array(rating).fill('★').join('');
  function formatDate(date:Date) {
    // Extract the day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    const year = date.getFullYear();
  
    // Format day and month as two-digit strings
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    // Combine day, month, and year using the desired separator
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  

  

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4" key={index}>
      <div className="flex items-center mb-2">
        <div className="mr-2 text-yellow-400">{stars}</div>
        <div className="text-gray-600">{name}  {surname} {"   "}   </div>
        <div className="text-gray-600 ml-2">{  formatDate(new Date(date))}</div>
      </div>
      {
        approved &&  <div className="text-gray-500 text-sm">{comment}</div>
      }


    </div>
  );
};

export default Comment;