import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  // flexDirection: "row",
  // flexWrap: "wrap",
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
  height: "100px",
  width: "100px"
};

const onHoverThumb = (e) => {
  console.log(e);
};

function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className="thumb" key={file.name} onMouseOver={onHoverThumb}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div style={thumbsContainer}>{thumbs}</div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <img src={process.env.PUBLIC_URL + "/images/plus.png"} />
        <p>사진/동영상</p>
      </div>
    </section>
  );
}

export default Dropzone;
