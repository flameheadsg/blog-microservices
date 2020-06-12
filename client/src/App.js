import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

export default () => {
  return (
    <div className="container" style={{padding: "2%"}}>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}