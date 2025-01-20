import React, { useContext, useState, useEffect } from 'react';
import "./Home.css"
import { assets } from '../assets/assets';
import { Context } from '../context/Context';

const Card = ({ prompt, icon, onClick }) => (
  <div onClick={() => onClick(prompt)} className="card">
    <p>{prompt}</p>
    <img src={icon} alt="" />
  </div>
);

const Home = () => {
  const { onSent, setRecentPrompt, recentPrompt, showResult, loading, resultData, input, setInput, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <div onClick={() => newChat()} className="gemini-logo">
          <p>Gemini</p>
        </div>    
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello there!</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
            <Card prompt="Recommend stunning destinations to visit on a road trip" icon={assets.compass_icon} onClick={loadPrompt} />
            <Card prompt="Summarize this topic in simple terms: urban planning" icon={assets.bulb_icon} onClick={loadPrompt} />
            <Card prompt="Come up with ideas for team-building activities for our company retreat" icon={assets.message_icon} onClick={loadPrompt} />
            <Card prompt="Enhance the clarity and organization of this code snippet:" icon={assets.code_icon} onClick={loadPrompt} />

            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr className="hr2" />
                  <hr className="hr3" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (input === '' && e.key === 'Enter') {
                  e.preventDefault();
                } else if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSent();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input && <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" />}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};


export default Home
