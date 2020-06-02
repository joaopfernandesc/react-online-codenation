import React, { useState } from 'react';

import SuccessMessage from '../../components/SuccessMessage';

import './UserForm.scss';

const UserForm = () => {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [email, setEmail] = useState("johndoe@gmail.com")
  const [imageUrl, setImageUrl] = useState("");
  const [created, setCreated] = useState(false);
  
  function handleSetName(value) {
    setName(value);
  }
  function handleSetUsername(value) {
    setUsername(value);
  }

  function handleSetEmail(value) {
    setEmail(value);
  }
  
  function handleNewUser(event) {
    event.preventDefault();

    fetch("https://5e7d0266a917d70016684219.mockapi.io/api/v1/users", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, avatar: imageUrl, username, email
      })
    }).then(() => {
      setCreated(true)
    })
  }

  function handleImageUrl(link) {
    setImageUrl(link);
  }

  return (
    <React.Fragment>
      <section className="profile" data-testid="user-form">
        <div className="container">
          <div className="profile-data">
            <div className="user">
              <div className="user__thumb">
                <img src={imageUrl} alt=""/>
              </div>
              { name &&
                <p className="user__name">
                  {name} <span>@{username}</span>
                </p>
              }
            </div>
          </div>
        </div>
      </section>
      <section className="post__form">
        <div className="container">
          <div className="post__form__wrapper">
            <label >
              Nome:
            </label>
            <input type="text" value={name} onChange={(event) => handleSetName(event.target.value)}/>
            <label >
              Usuário:
            </label>
            <input type="text" value={username} onChange={(event) => handleSetUsername(event.target.value)}/>
            <label >
              E-mail:
            </label>
            <input type="text" value={email} onChange={(event) => handleSetEmail(event.target.value)}/>
            <label >
              Url da imagem de perfil:
            </label>
            <input type="text" placeholder="http://..." value={imageUrl} onChange={(event) => handleImageUrl(event.target.value)}/>
            <button onClick={(event) => handleNewUser(event)} >Cadastrar</button>
          </div>
        </div>
      </section>

      { created ? <SuccessMessage /> : <div></div>}
    </React.Fragment>
  );
};

export default UserForm;
