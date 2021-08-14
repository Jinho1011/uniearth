import React, { useState, useEffect } from "react";

import "../styles/Posts.css";

const Post = ({ post }) => {
  console.log("🚀 ~ file: Post.js ~ line 4 ~ Post ~ post", post);
  return (
    <div className="post-container">
      <div className="content-container">
        <div className="content-header">
          <div className="user-container">
            <img
              src={process.env.PUBLIC_URL + "/images/profileImgFull.png"}
              alt="scope"
            />
            <div className="user-info">
              <div className="user-name">{post.post_owner}</div>
              <div className="user-time">{post.post_updatestamp}</div>
            </div>
          </div>
          <div className="likes-container"></div>
        </div>
        <div className="content-body"></div>
      </div>
      <div className="comment-container">asd</div>
    </div>
  );
};

export default Post;
