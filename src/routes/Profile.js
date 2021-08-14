import React, { useState, useEffect } from "react";

import { Background } from "../components/Background";
import Header from "../components/Header";

import MyProfile from "../components/MyProfile.js";
import Heart from "../components/Heart.js";
import MyPosts from "../components/MyPosts.js";

import '../styles/ProfileMain.css';

const content = [
  {
    tab: "내 프로필",
    content:
    <MyProfile />
  },
  {
    tab: "찜한 목록",
    content:
    <Heart />
  },
  {
    tab: "내 포스트 관리",
    content:
    <MyPosts />
  }
];

const useTabs = (initialTabs, allTabs) => {
  const [contentIndex, setContentIndex] = useState(initialTabs);
  return {
      contentItem: allTabs[contentIndex],
      contentChange: setContentIndex
  };
};

const Profile = () => {
  const { contentItem, contentChange } = useTabs(0, content);

  return (
    
    <Background>
      <Header></Header>
      <div className="main">
            <div className="probar">
            {content.map((section, index) => (
            <button onClick={() => contentChange(index)}>{section.tab}</button>
            ))}
            </div>
            {contentItem.content}
        </div>
      
      
    </Background>
  );
};

export default Profile;
