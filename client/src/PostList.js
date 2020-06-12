import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div
        className="card"
        key={post.id}
        style={{width: "30%", marginBottom: "5%"}}
      >
        <div className="card-body">
          <h4>{post.title}</h4>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h3>Posts</h3>
      {renderedPosts}
    </div>
  );
}