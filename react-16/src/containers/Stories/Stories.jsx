import React, { useState } from "react";

import Story from '../../components/Story';

import './Stories.scss';

const Stories = ({ stories, getUserHandler }) => {
  const [showStory, setShowStory] = useState(false);
  const [user, setUser] = useState({});
  const [story, setStory] = useState({});

  function handleStoryChoice(story, profileData) {
    setShowStory(!showStory)
    setStory(story)
    setUser(profileData)
  }

  return (
    <React.Fragment>
      <section className="stories" data-testid="stories">
        <div className="container">
          {
            stories.map((story, index) => {
              const profileData = getUserHandler(story.userId);

              return (
                <button 
                  className={`user__thumb ${index === 0 && 'user__thumb--hasNew'}`}
                  onClick={() => handleStoryChoice(story, profileData) }
                >
                  <div className="user__thumb__wrapper">
                    <img src={profileData.avatar} alt={profileData.name}/>
                  </div>
                </button>
              );
            })
          }
        </div>
      </section>

      {showStory && (
        <Story user={user} story={story} handleClose={() => setShowStory(!showStory)} key={story.id}/>
      )}
    </React.Fragment>
  );
};

export default Stories;
