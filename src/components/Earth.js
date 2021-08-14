import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";

import "../styles/Earth.css";

const Earth = () => {
  const globeEl = useRef();
  let earth = null;
  let camera = null;
  let scene = null;
  let canvas = null;
  let controls = null;

  const initEarth = () => {
    canvas = globeEl.current;
    scene = canvas.scene();
    camera = canvas.camera();
    earth = scene.children[3];
    controls = canvas.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = -2;
    // console.log(camera.position);

    camera.position.set(2.14313, 2.14313, 236);
  };

  useEffect(() => {}, []);

  return (
    <Globe
      ref={globeEl}
      width={480}
      height={480}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundImageUrl={process.env.PUBLIC_URL + "/images/transparent.png"}
      onGlobeReady={initEarth}
      animateIn={true}
    />
  );
};

export default Earth;
