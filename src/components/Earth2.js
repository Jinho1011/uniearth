import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const Earth = () => {
  const globeEl = useRef();
  let earth = null;
  let camera = null;
  let scene = null;
  let canvas = null;
  let controls = null;
  useEffect(() => {
    setTimeout(() => {
      canvas = globeEl.current;
      scene = canvas.scene();
      camera = canvas.camera();
      earth = scene.children[3];
      controls = canvas.controls();
    }, 1000);
    camera = globeEl.current.camera();
  }, []);

  const clickEvent = (lat, lng) => {
    console.log(lat, lng);
  };

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      pointAltitude="size"
      pointColor="color"
      animateIn={false}
      onGlobeClick={clickEvent} //(lat, lng) => console.log(lat, lng)}
    />
  );
};

export default Earth;
