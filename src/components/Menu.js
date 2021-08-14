import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import "../styles/menu.css";
import "../styles/form.css";

const Menu = ({ setShowModal }) => {
  return (
    <div className="container is-max-desktop menu">
      <div className="menu-left">
        <button className="menu-button">현재 위치를 경도로 설정</button>
        <button className="menu-button">아시아, 오세아니아</button>
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