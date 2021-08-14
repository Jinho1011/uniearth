import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

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
  width: "144px"
};

const onHoverThumb = (e) => {
  console.log(e.target);
};

function Dropzone({files, setFiles}) {
  //const [images, setImages] = useState([]);
  const [fileCount, setFileCount] = useState(Number('0'));
  //const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          }),
          
        ),
      ]);
    },
  });

  const thumbs = files.map((file) => {
    
    return(
      <div className="thumb" key={file.name} >
        <div style={thumbInner}>
          <img src={file[0].preview} style={img}  onMouseOver={onHoverThumb}/>
        </div>
      </div>
    )
  });

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  },[files]);

  return (
    <section className="container">
      {/* <Thumbs style={thumbsContainer}></Thumbs> */}
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div style={thumbsContainer}>
          {thumbs}
          <img src={process.env.PUBLIC_URL + "/images/plus.png"} />
          <p>사진/동영상</p>
        </div>
      </div>
    </section>
  );
}

export default Dropzone;
