import React, { useState, useEffect } from "react";
import ReactGlobe from "react-globe";
import "../styles/Earth.css";
const Earth = () => {
  const [options, setOptions] = useState({
    enableCameraAutoRotatae: true,
    cameraAutoRotateSpeed: 2,
    cameraRotateSpeed: 0.5,
    enableCameraZoom: false,
    cameraMaxPolarAngle: (Math.PI * 9) / 16,
    cameraMinPolarAngle: (Math.PI * 7) / 16,
  });
  const [focus, setFocus] = useState(null);
  const [coordinates, setCoordinates] = useState([1, 3]);
  const [globe, setGlobe] = useState(null);
  function checkpoint() {
    setOptions(false, 0, 0);
    console.log(globe);
  }
  useEffect(() => {
    console.log(globe);
  }, globe);
  return (
    <>
      <text>coordinates</text>
      <button onClick={checkpoint}>버튼</button>
      <div className="globe">
        <ReactGlobe
          height="50vh"
          width="50wh"
          options={options}
          globeTexture={process.env.PUBLIC_URL + "/images/globe.png"}
          globeBackgroundTexture="null"
          focus={focus}
          onGetGlobe={setGlobe}
        />
      </div>
    </>
  );
};

export default Earth;
