import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import "../styles/menu.css";
import "../styles/form.css";

const Menu = ({ setShowModal, continents }) => {
  useEffect(() => {
    // console.log(continents);
  }, [continents]);

  return (
    <div className="container is-max-desktop menu">
      <div className="menu-left">
        <button className="menu-button">현재 위치를 경도로 설정</button>
        {continents.length ? (
          <button className="menu-button">
            {continents.map((c) => c + "  ")}
          </button>
        ) : null}
      </div>
      <div className="menu-right">
        <button className="menu-button" onClick={() => setShowModal(true)}>
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default Menu;
