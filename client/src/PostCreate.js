import React, { useState } from 'react';
import axios from 'axios';

export default ({ callback }) => {
  const [title, setTitle] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:4000/posts', {
      title,
    });
    setTitle('');
    callback();
  }

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h3>Title</h3>
          <input
            className="form-control"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}