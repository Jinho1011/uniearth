import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "bulma/css/bulma.min.css";

import "../styles/header.css";
import isLogin from "../utils/isLogin";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header container">
      <div className="header-logo">
        <img src={process.env.PUBLIC_URL + "/images/logo.png"}></img>
      </div>
      {isLogin() ? (
        <div className="navs">
          <div className="nav">
            <Link to="/feed" className="nav-link">
              피드
            </Link>
          </div>
          <div className="nav">
            <Link to="/profile" className="nav-link">
              마이페이지
            </Link>
          </div>
        </div>
      ) : (
        <div className="navs">
          <div className="nav">
            <Link to="/login" className="nav-link">
              로그인
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
