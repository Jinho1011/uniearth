import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "bulma/css/bulma.min.css";

import Header from "../components/Header";

const Background = styled.div`
  background: url(${process.env.PUBLIC_URL + "/images/background.png"});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;

const Main = () => {
  return (
    <Background>
      <Header></Header>
    </Background>
  );
};

export default Main;
