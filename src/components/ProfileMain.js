import React from 'react';
import MyProfile from "./MyProfile.js";       // 내 프로필
import Heart from "./Heart.js";             // 찜한 목록
import MyPosts from "./MyPosts.js";         // 내 포스트 관리

import '../styles/ProfileMain.css';

const ProfileMain = () => {

    return (
        <div className="main">
            <div className="probar">
                <div className="tap1">내 프로필</div>
                <div className="tap2">찜한 목록</div>
                <div className="tap3">내 포스트 관리</div>
            </div>
            <MyProfile></MyProfile>
            <Heart></Heart>
            <MyPosts></MyPosts>
        </div>

    );
}

export default ProfileMain;