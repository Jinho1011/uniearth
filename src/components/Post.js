import React, { useState, useEffect } from "react";

import "../styles/Posts.css";

const Post = ({ user, post, refresh, setRefresh }) => {
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const leaveComment = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
    );

    var raw = JSON.stringify({
      cmt_post: post.SEQ,
      cmt_owner: user.useremail,
      cmt_text: comment,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/uniearth/comments/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setRefresh(true);
        console.log("🚀 ~ file: Post.js ~ line 65 ~ .then ~ result", result);
      })
      .catch((error) => console.log("error", error));
  };

  const getComments = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch("/uniearth/comments/cmt_post/" + post.SEQ, requestOptions)
      .then((response) => {
        return { res: response, data: response.text() };
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const init = async () => {
      let { res, data } = await getComments();
      if (res.status === 200) {
        data = await data;
        data = JSON.parse(data);
        setComments(data.comments);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      let { res, data } = await getComments();
      if (res.status === 200) {
        data = await data;
        data = JSON.parse(data);
        setComments(data.comments);
      }
    };
    init();
  }, [refresh]);

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
          <div className="comments">
            {comments.map((comment) => {
              return (
                <div key={comment.SEQ} className="comment">
                  <div className="comment-owner">{comment.cmt_owner}</div>
                  <div className="comment-text">{comment.cmt_text}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="input-container">
          <a onClick={leaveComment}>올리기</a>
          <input
            className="comment-input"
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 적어보세요"
            value={comment}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Post;
