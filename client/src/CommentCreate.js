import React, { useState } from 'react';
import axios from 'axios';

export default ({ postID, callback }) => {
  const [comment, setComment] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postID}/comments`, {
      comment,
    });
    setComment('');
    callback();
  }

  return (
    <div>
      <hr />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h4>Add Comment</h4>
          <input
            className="form-control"
            onChange={e => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}