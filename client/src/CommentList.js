import React from 'react';

export default ({ comments }) => {
  const renderedComments = Object.values(comments).map(comment => {
    switch (comment.status) {
      case 'PENDING':
        comment.comment = 'This comment is pending approval...';
        break;
      case 'REJECTED':
        comment.comment = 'This comment has been rejected by moderator.';
        break;
      case 'APPROVED':
      default:
    }
    
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