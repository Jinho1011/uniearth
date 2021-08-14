import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const Earth = ({ setCoord, setTime }) => {
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

  var today = new Date();
  // console.log(today.getHours());
  // console.log(today.getMinutes());
  const initEarth = () => {};

  const clickEvent = (e) => {
    setCoord({
      lat: Math.round(e.lat),
      lng: Math.round(e.lng),
    });
    let month = today.getMonth();
    let hours = today.getHours() - Math.ceil(e.lng / 15) + 9;
    let date = today.getDate();
    let minutes = today.getMinutes();
    // ,date,hours,minutes;
    // (today.getHours() - Math.ceil(e.lng / 15) + 9)>=0?:
    setTime({
      month: month + 1,
      date: date,
      hours: hours,
      minutes: minutes,
    });
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
