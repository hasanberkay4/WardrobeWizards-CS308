import React from "react";
import Comment from "./Comments";

type CommentProps = {
  rating: number;
  comment: string;
  name: string;
  surname: string;
};

type CommentListProps = {
  CommentItems: CommentProps[];
  // add any other properties here
};

const CommentList: React.FC<CommentListProps> = ({ CommentItems }) => {
  return (
    <>
      {CommentItems.map((comment, index) => (
        <Comment
          rating={comment.rating}
          comment={comment.comment}
          name={comment.name}
          surname={comment.surname}
        />
      ))}
    </>
  );
};

export default CommentList;
