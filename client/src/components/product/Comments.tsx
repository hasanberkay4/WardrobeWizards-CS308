import React from 'react';

type CommentProps = {
    index: number;
  rating: number;
  comment: string;
  name: string;
  surname: string;
};

const Comment: React.FC<CommentProps> = ({ index, rating, comment, name, surname }) => {
  const stars = Array(rating).fill('★').join('');

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4" key={index}>
      <div className="flex items-center mb-2">
        <div className="mr-2 text-yellow-400">{stars}</div>
        <div className="text-gray-600">{comment}</div>
      </div>
      <div className="text-gray-500 text-sm">{name} {surname}</div>
    </div>
  );
};

export default Comment;