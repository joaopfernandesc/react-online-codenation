import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import UserProfile from '../../containers/UserProfile';
import UserPosts from '../../containers/UserPosts';

import Loading from '../../components/Loading';

const ProfileRoute = () => {
  const { username } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/users?search=${username}`)
      .then(response => response.json())
      .then(profileData => 
        setUser({
          id: profileData[0].id,
          avatar: profileData[0].avatar,
          name: profileData[0].name,
          email: profileData[0].email,
          username: profileData[0].username
        })
      );
  }, []);

  useEffect(() => {
    if (user.id) {
      fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/${user.id}/posts/`)
        .then(response => response.json())
        .then(postsData => {setPosts(postsData); setLoaded(true)})
    }
  }, [user])
  
  return (
    <div data-testid="profile-route">
      { loaded ?
        <div>
          <UserProfile avatar={user.avatar} name={user.name} username={user.username}/>
          <UserPosts posts={posts}/>
        </div>
        : (<Loading/>)
      }
    </div>
  );
};

export default ProfileRoute;
