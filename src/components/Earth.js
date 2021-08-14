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
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2;
    }, 1000);
    camera = globeEl.current.camera();
  }, []);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl=""
      pointAltitude="size"
      pointColor="color"
      animateIn={false}
    />
  );
};

export default Earth;
