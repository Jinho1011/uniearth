import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { Background } from "../components/Background";
import Earth from "../components/Earth2";
import Writer from "../components/Writer";
import Header from "../components/Header";
import Menu from "../components/Menu";
import "../styles/Feed.css";
import { EqualStencilFunc } from "three";

const Feed = () => {
  const [token, setToken] = useState({});
  const [coord, setCoord] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState({});
  // const [selected, setSelected] = useState("");
  const [continents, setContinents] = useState([]);
  const c = [
    { name: "아시아", range: [24, 127] },
    { name: "유럽", range: [-10, 40] },
    { name: "아프리카", range: [-16, 50] },
    { name: "북아메리카", range: [-168, -53] },
    { name: "남아메리카", range: [-81, -34] },
    { name: "오세아니아", range: [113, 178] },
  ];

  useEffect(() => {
    let JWT = window.sessionStorage.getItem("JWT");
    setToken(JWT);
  }, []);
  useEffect(() => {
    setContinents([]);
    c.map((a) => {
      // console.log(a.range[0]);
      if (a.range[0] <= coord.lng && coord.lng <= a.range[1]) {
        setContinents([...continents, a.name]);
      }
    });
    console.log(continents);
    console.log(coord);
  }, [coord]);
  useEffect(() => {
    console.log(time);
  }, [time]);
  return (
    <Background>
      <Header></Header>
      <div className="container is-max-desktop earth-container">
        <div className="info-container">
          <div className="time-info">
            {time.hours}:{time.minutes}
          </div>
          <div className="lng-info">{coord.lng}</div>
        </div>
        <Earth setCoord={setCoord} setTime={setTime}></Earth>
      </div>
      <Menu setShowModal={setShowModal} continents={continents}></Menu>
      <Writer showModal={showModal} setShowModal={setShowModal} token={token} />
    </Background>
  );
};

export default Feed;
