import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ postID }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postID}/comments`);
    setComments(res.data);
  }

  useEffect(() => {
    fetchComments();
  }, []);

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