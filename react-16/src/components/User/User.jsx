import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Loading from '../Loading';

const User = ({ infoUser })  => {
  const {avatar, name, username, } = infoUser;
  
  const [altAvatar, setAltAvatar] = useState("");
  useEffect(() => {
    if (!avatar) {
        fetch("https://dog.ceo/api/breeds/image/random")
        .then((res) => res.json())
        .then(data => setAltAvatar(data.message))
      }
    }, [avatar])


  return (
    <article className="post" data-testid="user">
      <header className="post__header">
        <Link to={`/users/${username}`} className="user">
          <div className="user__thumb">
            {
              avatar ? <img src={avatar} alt={name}/> : 
              <img src={altAvatar} alt="random dog" />
            }
          </div>
          <div className="user__name">
              { name }
          </div>
        </Link>
      </header>
    </article>
  )
};

export default User;
