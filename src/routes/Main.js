import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "bulma/css/bulma.min.css";

import { Background } from "../components/Background";
import Header from "../components/Header";
import ReactGlobe from "react-globe";
import "../styles/Main.css";
const Background = styled.div`
  background: url(${process.env.PUBLIC_URL + "/images/background.png"});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;

const Main = () => {
  const options = {
    cameraAutoRotateSpeed: 2,
    enableCameraZoom: false,
    // ambientLightIntensity: null,
    // globeCloudsOpacity: null,
    // globeGlowPower: 0.1,
    globeGlowRadiusScale: 0.1,
  };
  return (
    <Background className="background">
      <Header></Header>
      <div className="content">
        <div className="picture">
          <img
            className="picture-item"
            src={process.env.PUBLIC_URL + "/images/biglogo.png"}
          ></img>
          <img
            className="picture-item"
            src={process.env.PUBLIC_URL + "/images/detail.png"}
          ></img>
        </div>
        <div className="globe-container">
          <ReactGlobe
            height="50vh"
            options={options}
            width="50wh"
            globeBackgroundTexture="null"

            // globeTexture='process.env.PUBLIC_URL + "/images/globe.png"'
            // focus={focus}
          />
        </div>
      </div>
    </Background>
  );
};

export default Main;
