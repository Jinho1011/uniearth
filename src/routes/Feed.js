import React, { useState, useEffect } from "react";

import Earth from "../components/Earth";
import Writer from "../components/Writer";
import Header from "../components/Header";
const Feed = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header></Header>
      <Earth></Earth>
      <button onClick={() => setShowModal(true)}>글쓰기</button>
      <Writer showModal={showModal} setShowModal={setShowModal}></Writer>
    </>
  );
};

export default Feed;
