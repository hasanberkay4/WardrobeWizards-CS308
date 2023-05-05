import React from "react";
import Comment from "./Comments";
import { commentListItem } from "../../types/commentListType";



type CommentListProps = {
  CommentItems: commentListItem[];
  // add any other properties here
};

const CommentList: React.FC<CommentListProps> = ({ CommentItems }) => {
  return (
    <>
      {CommentItems.map((comment, index) => (
        <Comment
          key={index}
          index={index}
          rating={comment.rating}
          comment={comment.description}
          name={comment.customerId.name}
          surname={comment.customerId.surname}
          date={comment.date}
          approved={comment.approved}
        />
      ))}
    </>
  );
};

export default CommentList;
