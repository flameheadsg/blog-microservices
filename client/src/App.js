import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCreate from './PostCreate';
import PostList from './PostList';

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPosts(res.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <div className="container" style={{padding: "2%"}}>
      <PostCreate callback={fetchPosts} />
      <hr />
      <h2>Posts</h2>
      <PostList
        callback={fetchPosts}
        posts={posts}
      />
    </div>
  );
}