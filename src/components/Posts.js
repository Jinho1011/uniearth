import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "bulma/css/bulma.min.css";

import "../styles/Posts.css";
import Post from "./Post";

const Posts = ({ token, coord }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
    );

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch("/uniearth/posts", requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (typeof token === "string") {
      let userInfo = jwt_decode(token);
      setUser(userInfo);
    }
  }, [token]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      // console.log("🚀 ~ file: Posts.js ~ line 18 ~ useEffect ~ user", user);
    }
  }, [user]);

  useEffect(() => {
    const init = async () => {
      let res = await getPosts();
      res = JSON.parse(res);
      setPosts(res.posts);
    };
    init();
  }, []);

  return (
    <div className="posts-container">
      {posts
        .slice(0)
        .reverse()
        .map((post) => {
          return <Post post={post} key={post.SEQ}></Post>;
        })}
    </div>
  );
};

export default Posts;
