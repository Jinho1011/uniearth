import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "bulma/css/bulma.min.css";

import { Background } from "../components/Background";
import Header from "../components/Header";
import Earth from "../components/Earth";
import "../styles/Main.css";

const Main = () => {
  return (
    <Background className="background">
      <Header></Header>
      <div
        className="container is-max-desktop"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>hi</div>
        <Earth></Earth>
      </div>
    </Background>
  );
};

export default Main;
