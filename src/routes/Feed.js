import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import Earth from "../components/Earth";
import Writer from "../components/Writer";
import Header from "../components/Header";
const Feed = () => {
  const [token, setToken] = useState({});

  useEffect(() => {
    let JWT = window.sessionStorage.getItem("JWT");
    setToken(JWT);
  }, []);

  useEffect(() => {}, [token]);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header></Header>
      <Earth></Earth>
      <button onClick={() => setShowModal(true)}>글쓰기</button>
      <Writer showModal={showModal} setShowModal={setShowModal} token={token} />
    </>
  );
};

export default Feed;
