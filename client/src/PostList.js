import React from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default ({ posts, callback }) => {
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
            callback={callback}
          />
        </div>
      </div>
    );
  });

  return <div>{renderedPosts}</div>;
}