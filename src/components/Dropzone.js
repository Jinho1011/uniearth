import React, { useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import VideoThumbnail from 'react-video-thumbnail';

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  // marginTop: 16,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "144px",
  width: "144px",
};

const onHoverThumb = (e) => {
  // console.log(e.target);
};

let fileCount = Number(0);

function Dropzone({ files, setFiles }) {
  const zoneRef = useRef(null);

  const removeDropzone = () => {
    zoneRef.current.style.display = "none";
    console.log(zoneRef.current);
  };
  //const [images, setImages] = useState([]);
  //const [fileCount, setFileCount] = useState(Number('0'));
  //const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    //accept: "image/*" | "video/*", 
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (fileCount >= 6) {
        removeDropzone();
      }
      let fileName=acceptedFiles[0].name.split('.');
      // console.log(fileName);
      let fileExtension=fileName[fileName.length-1];
      // console.log(fileExtension);
      if(fileExtension === "mp4" || fileExtension === "avi"){
      }
      setFiles([
        ...files,
        acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          (fileCount = fileCount + 1),
        ),
      ]);
    },
  });

  const thumbs = files.map((file) => {
    return (
      <div className="thumb" key={file[0].name}>
        <div style={thumbInner}>
          <img src={file[0].preview} style={img} onMouseOver={onHoverThumb} />
        </div>
      </div>
    );
  });

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      {/* <Thumbs style={thumbsContainer}></Thumbs> */}
      {thumbs}
      <div {...getRootProps({ className: "dropzone" })} ref={zoneRef}>
        <input {...getInputProps()} />
        <div style={thumbsContainer}>
          <img src={process.env.PUBLIC_URL + "/images/plus.png"} />
          <p>사진/동영상</p>
        </div>
      </div>
    </section>
  );
}

export default Dropzone;
