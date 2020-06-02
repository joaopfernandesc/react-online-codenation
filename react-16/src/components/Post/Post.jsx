import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Post.scss';

const Post = ({ postInfo, userInfo }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(postInfo.comments);

  useEffect(() => {
    if (liked) {
      setComments([...postInfo.comments, 1])
    } else {
      setComments([...postInfo.comments])
    }
  }, [liked])

  return (
    <article className="post" data-testid="post">
      { userInfo && 
        (<header className="post__header">
          <Link to={`/users/${userInfo.username}`} className="user">
            <img src={userInfo.avatar} alt={userInfo.name} className="user__thumb"/>
            <span className="user__name">{userInfo.name}</span>
          </Link>
          <button className="post__context" onClick={() => setIsFollowing(!isFollowing)}>
          { isFollowing ? 
            <span className="follow-btn is-following">{"Seguindo"}</span>
            :
            <span className="follow-btn">{"Seguir"}</span>
          }
          </button>
        </header>)
      }
      <div className="post__figure">
        <img src={postInfo.imageUrl} alt=""/>
      </div>
      { userInfo && 
      (<div className="post__controls">
        <button className="post__control" onClick={() => {setLiked(!liked)}}>
          { liked ? <i className="fas fa-heart"/> : <i className="far fa-heart"/>}
        </button>
        {comments[0] && <span>
          Curtido por <Link >{comments[0].name}</Link> e outra{comments.length > 2 ? <span>{"s"}</span> : <span></span>} <Link>{comments.length - 1} pessoa{comments.length > 2 ? <span>{"s"}</span> : <span></span>}</Link>
        </span>}
      </div>)}
    </article>
  );
};

export default Post;
