import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { Background } from "../components/Background";
import Earth from "../components/Earth2";
import Writer from "../components/Writer";
import Header from "../components/Header";
import Menu from "../components/Menu";
import "../styles/Feed.css";

const Feed = () => {
  const [token, setToken] = useState({});
  const [coord, setCoord] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let JWT = window.sessionStorage.getItem("JWT");
    setToken(JWT);
  }, []);

  useEffect(() => {
    console.log(coord);
  }, [coord]);

  return (
    <Background>
      <Header></Header>
      <div className="container is-max-desktop earth-container">
        <div className="info-container">
          <div className="time-info"></div>
          <div className="lng-info">{coord.lng}</div>
        </div>
        <Earth setCoord={setCoord}></Earth>
      </div>
      <Menu></Menu>
      <button onClick={() => setShowModal(true)}>글쓰기</button>
      <Writer showModal={showModal} setShowModal={setShowModal} token={token} />
    </Background>
  );
};

export default Feed;
