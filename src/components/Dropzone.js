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

// const onClickThumb = (e) => {
//   //console.log(e.target);
//   //e.target.style.display="none";

// };

function Dropzone({ files, setFiles, fileCount, setFileCount }) {
  const zoneRef = useRef(null);
  const removeDropzone = () => {
    zoneRef.current.style.display = "none";
    console.log(zoneRef.current);
  };
  //const [images, setImages] = useState([]);
  //const [fileCount, setFileCount] = useState(Number('0'));
  //const [files, setFiles] = useState([]);

  const waitFunction = (sec) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, sec)
    })
  }

  const videoCapture = (file) => {
    return new Promise((resolve, reject) => {
      let video = document.createElement('video');
      let url = URL.createObjectURL(file);
      video.setAttribute('src', url);
      video.load();
      video.addEventListener('error', (err) => {
        reject(err);
      })
      setTimeout(() => {
        video.currentTime = video.duration / 2;
      }, 200);
      video.addEventListener('loadedmetadata', () => {
        video.addEventListener('seeked', () => {          
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
           ctx.canvas.toBlob(
             blob => {
               resolve(blob);
             },
             "image/jpeg",
             1.0
           );
        })
      })
    })
  }

  const videoCapture2 = (file) => {
    let canvas = document.createElement('canvas');
      let video = document.createElement('video');
      let url = URL.createObjectURL(file);
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 144, 144);

      videoCapture(file).then( res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })

      return canvas.toDataURL();
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" | "video/*", 
    //accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (fileCount >= 6) {
        removeDropzone();
      }
      
      let fileName=acceptedFiles[0].name.split('.');
      // console.log(fileName);
      let fileExtension=fileName[fileName.length-1];
      // console.log(fileExtension);
      if(fileExtension === "mp4" || fileExtension === "avi"){
        let currentFile = acceptedFiles[0];

        let imageUrl = videoCapture(currentFile).then( (res) => {
          console.log(res);
          setFiles([
            ...files,
            acceptedFiles.map(
              (file) => 
                Object.assign(file, {
                  preview: URL.createObjectURL(res)
                }),
                setFileCount(fileCount+1),
            ),
          ])
        }).catch( (err) => {
          alert('해당 비디오는 사용할 수 없습니다.');
        })
        // setFiles([
        //   ...files,
        //   acceptedFiles.map(
        //     (file) => {
        //       let imageUrl;
        //       videoCapture(file).then( (res) => {
        //         file.preview = res;
        //       }).catch( (err) => {
        //         console.log(err);
        //       })
        //     },
        //     setFileCount(fileCount+1),
        //   ),
        // ])
      }
      else{
        setFiles([
          ...files,
          acceptedFiles.map(
            (file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              }),
            setFileCount(fileCount+1),
          ),
        ]);
      }
    },
  });

  const thumbs = files.map((file) => {
    return (
      <div className="thumb" key={file[0].name}>
        <div style={thumbInner}>
          <img src={file[0].preview} style={img} /> 
        </div>
      </div>
    );
  });

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="dropzoneContainer">
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
