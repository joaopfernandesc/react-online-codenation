import React from 'react';

import Post from '../../components/Post';

import './UserPosts.scss';

const UserPosts = ({ posts }) => (
  <div className="container" data-testid="user-posts">
    { posts.length > 0 ? 
      <div className="user-posts ">
        {posts.map(post => {
          return (
            <Post postInfo={post} />
          )
      })} 
      </div>
      : 
      <div className="no-posts">
        <span className="no-posts__content">Não há publicações deste usuário.</span>
        <span className="no-posts__emoji" role="img" aria-label="Emoji Triste">😥</span>
      </div>
    }
  </div>
);

export default UserPosts;
