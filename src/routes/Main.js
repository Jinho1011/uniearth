import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "bulma/css/bulma.min.css";

import Header from "../components/Header";
import { Background } from "../components/Background";

const Main = () => {
  return (
    <Background>
      <Header></Header>
    </Background>
  );
};

export default Main;
