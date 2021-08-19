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
        // console.log("🚀 ~ file: Post.js ~ line 65 ~ .then ~ result", result);
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

  const getFiles = () => {
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

    return fetch("/uniearth/files/file_post/" + post.SEQ, requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const init = async () => {
      let { res, data } = await getComments();
      let fileRes = await getFiles();

      if (res.status === 200) {
        data = await data;
        data = JSON.parse(data);
        setComments(data.comments);
      }

      if (fileRes) {
        //fileRes.files[0]: {file_path: "[B@5a53782d", file_timestamp: "2021-08-15 20:12:48.0", file_owner: "dong", file_post: "64", SEQ: "5", …}
        //fileRes.files[1]: {file_path: "[B@5a53782d", file_timestamp: "2021-08-15 20:12:48.0", file_owner: "dong", file_post: "64", SEQ: "6", …}
        setFiles(fileRes.files);
      }
      console.log("🚀 ~ file: Post.js ~ line 94 ~ init ~ res2", fileRes);
      // if(res2?.status === 200) {
      //   data2 = await data2;
      //   data2 = JSON.parse(data2);
      //   console.log("🚀 ~ file: Post.js ~ line 97 ~ init ~ data2", data2)
      // }
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
        //hey
      }
    };
    init();
  }, [refresh]);

  const Images = () => {
    files.map((file) => {
      console.log(file.file_path);
      let bufferBase64 = new Buffer(file.file_path, "binary").toString(
        "base64"
      );
      console.log(bufferBase64);
      return null;
    });
  };

  //get /uniearth/files/file_post/게시글번호
  // --> 리턴: file_path 사용
  // <img src=file_path />
  /*
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    return fetch("/uniearth/files/file_post/포스트번호", requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .catch((error) => console.log("error", error));
  */

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
            files.map((file) => {
              // const base64String = new Buffer.from(file.file_path).toString(
              //   "base64"
              // );
              // const url = URL.createObjectURL(
              //   new Blob([file.file_path], { type: "image/*" })
              // );
              var data = new Uint8Array([
                91, 123, 34, 112, 114, 101, 118, 105, 101, 119, 34, 58, 34, 98,
                108, 111, 98, 58, 104, 116, 116, 112, 58, 92, 47, 92, 47, 49,
                51, 46, 49, 50, 52, 46, 49, 51, 51, 46, 50, 48, 56, 58, 51, 48,
                48, 48, 92, 47, 99, 50, 48, 49, 50, 53, 53, 101, 45, 100, 52,
                53, 101, 45, 52, 56, 51, 50, 45, 97, 52, 56, 99, 45, 99, 52, 57,
                101, 54, 50, 48, 97, 99, 98, 49, 50, 34, 44, 34, 112, 97, 116,
                104, 34, 58, 34, -21, -111, -112, -22, -75, -65, 46, 80, 78, 71,
                34, 125, 93,
              ]);

              var buffer = new Buffer.from(file.file_path);
              // var data = new Uint8Array([buffer]);
              var blob = new Blob([data], { type: "image/jpeg" });
              var url = URL.createObjectURL(blob);

              return <img src={url} alt="" />;
            })
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
            onChange={(e) => {
              setComment(e.target.value);
              setRefresh(true);
            }}
            placeholder="댓글을 적어보세요"
            value={comment}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Post;
