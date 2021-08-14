import React, { useState, useEffect } from "react";

import "../styles/Posts.css";

const Post = ({ post }) => {
  const [files, setFiles] = useState([]);

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
        <div className="content-body">
          {files.length ? (
            <div></div>
          ) : (
            <div className="file-none">
              <div className="topic">오늘 먹은(먹을) 점심은?</div>
            </div>
          )}
        </div>
        <div className="content-text">
          <p>{post.post_info}</p>
        </div>
      </div>
      <div className="comment-container">
        <div>
          <div className="commnet-header">댓글</div>
          <div className="comments"></div>
        </div>
        <div className="input-container">
          <input
            className="comment-input"
            placeholder="댓글을 적어보세요"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Post;
