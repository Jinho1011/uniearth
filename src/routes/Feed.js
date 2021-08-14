import React, { useState, useEffect } from "react";

import Writer from "../components/Writer";

const Feed = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h1>Feed</h1>
      <button onClick={() => setShowModal(true)}>글쓰기</button>
      <Writer showModal={showModal} setShowModal={setShowModal}></Writer>
    </>
  );
};

export default Feed;
