import React, { useState, useEffect } from "react";

import { Background } from "../components/Background";
import Earth from "../components/Earth2";
import Writer from "../components/Writer";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Posts from "../components/Posts";
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
    // console.log(coord);
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
      <Menu setShowModal={setShowModal}></Menu>
      <Writer showModal={showModal} setShowModal={setShowModal} token={token} />

      <div className="container is-max-desktop ">
        <Posts token={token} coord={coord}></Posts>
      </div>
    </Background>
  );
};

export default Feed;
