import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const Earth = ({ setCoord }) => {
  const globeEl = useRef();
  let earth = null;
  let camera = null;
  let scene = null;
  let canvas = null;
  let controls = null;
  useEffect(() => {
    canvas = globeEl.current;
    scene = canvas.scene();
    camera = canvas.camera();
    earth = scene.children[3];
    controls = canvas.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    camera.position.set(2.14313, 2.14313, 240);
  }, []);

  const initEarth = () => {};

  const clickEvent = (lat, lng) => {
    // console.log(lat, lng);
  };

  return (
    <Globe
      ref={globeEl}
      width={360}
      height={360}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      pointAltitude="size"
      pointColor="color"
      animateIn={false}
      onGlobeClick={clickEvent} //(lat, lng) => console.log(lat, lng)}
      onGlobeReady={initEarth}
    />
  );
};

export default Earth;
