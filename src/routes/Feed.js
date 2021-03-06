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
  const [coord, setCoord] = useState({
    lat: 37,
    lng: 127,
  });
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState({});
  const [continents, setContinents] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
    let temp = [];

    c.map((a) => {
      if (a.range[0] <= coord.lng && coord.lng <= a.range[1]) {
        temp.push(a.name);
      }
    });

    setContinents(temp);
  }, [coord]);

  useEffect(() => {
    // console.log(time);
  }, [time]);

  return (
    <Background>
      <Header></Header>
      <div className="container is-max-desktop earth-container">
        <div className="info-container">
          {coord ? (
            <>
              <div className="time-info">
                {time.hours}:{time.minutes}
              </div>
              <div className="lng-info">{coord.lng}°</div>
            </>
          ) : null}
        </div>
        <Earth setCoord={setCoord} setTime={setTime}></Earth>
      </div>
      <Menu setShowModal={setShowModal} continents={continents}></Menu>
      <Writer
        showModal={showModal}
        setShowModal={setShowModal}
        token={token}
        setRefresh={setRefresh}
      />

      <div className="container is-max-desktop ">
        <Posts
          token={token}
          coord={coord}
          refresh={refresh}
          setRefresh={setRefresh}
        ></Posts>
      </div>
    </Background>
  );
};

export default Feed;
