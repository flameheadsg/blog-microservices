import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');
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
        style={{margin: "5%"}}
      >
        <div className="card-body">
          <h2>{post.title}</h2>
          <CommentList
            comments={post.comments}
          />
          <CommentCreate
            postID={post.id}
          />
        </div>
      </div>
    );
  });

  return <div>{renderedPosts}</div>;
}