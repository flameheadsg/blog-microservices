import React from 'react';

export default ({ comments }) => {
  const renderedComments = Object.values(comments).map(comment => {
    return (
      <li
        key={comment.id}
        style={{fontSize: "1.7em"}}
      >
        {comment.comment}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
}