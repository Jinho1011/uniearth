import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import Dropzone from "./Dropzone";
import Axios from "axios";
import jwt_decode from "jwt-decode";

import "../styles/Writer.css";

Modal.setAppElement(document.getElementById("root"));

const Writer = ({ showModal, setShowModal, token, setRefresh }) => {
  const [address, setAddress] = useState([]);
  const [coord, setCoord] = useState({});
  const [user, setUser] = useState({});
  const [topic, setTopic] = useState("false");
  const [files, setFiles] = useState([]);
  const [fillout, setFillout] = useState("");
  const [fileCount, setFileCount] = useState(0);

  const setLocation = () => {
    if (!navigator.geolocation) {
      console.log("사용자의 브라우저는 지오로케이션을 지원하지 않습니다.");
      return;
    }

    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      setCoord({
        lat: latitude,
        lng: longitude,
      });

      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}8&sensor=false&key=AIzaSyBR8RbKAXpP4kTkcQVBm_2E5jU19lb9LYo`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let res = JSON.parse(result).results[0];
          let address_comps = res.address_components;

          address_comps.map((comp) => {
            if (comp.types.includes("country")) {
              setAddress((oldArray) => [...oldArray, comp.long_name]);
            } else if (comp.types.includes("administrative_area_level_1")) {
              setAddress((oldArray) => [...oldArray, comp.long_name]);
            }
          });
        })
        .catch((error) => console.log("error", error));
    }
    function error() {
      setAddress(["경기도", "대한민국"]);
      setCoord({ lat: 27, lng: 127 });
      console.log("사용자의 위치를 찾을 수 없습니다.");
    }
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const closeModal = () => {
    setFiles([]);
    setFileCount(0);
    setShowModal(false);
  };

  const createPost = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
    );
    myHeaders.append("Content-Type", "application/json");

    //_update_seq을 리턴
    var raw = JSON.stringify({  
      post_title: "제목",
      post_info: fillout,
      post_topic: 1,
      post_owner: user.useremail,
      post_latitude: coord.lat,
      post_longitude: coord.lng,
      post_country: address[1],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch("/uniearth/posts", requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .catch((error) => console.log("error", error));
  };

  const createFile = (postResult, file) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
    );
    myHeaders.append("Content-Type", "application/json");

    //_update_seq을 리턴
    console.log(postResult);
    console.log(file);
    var raw = JSON.stringify({  
      file_post: postResult._updated_seq,
      file_owner: user.useremail,
      file_path: file,
      file_size: 1111
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch("/uniearth/files", requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .catch((error) => console.log("error", error));
  }

  const uploadFile = (file,) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
    );

    var formdata = new FormData();
    formdata.append("post_file.upload", file);
    //enctype: multipart/form-data
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    return fetch("/ftp/execute", requestOptions)
      .then((result) => result)
      .catch((error) => console.log("error", error));

    // fetch(
    //   "https://uniearth.api.dev-whoan.xyz:58443/ftp/execute",
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
  };

  const submit = async () => {
    let res = await createPost();

    if (files.length) {
      // 파일이 있는 경우
      files.map((file) => {
        console.log(file);
      //  let fRes = uploadFile(file);
        createFile(res, file);
      });
    }
    setRefresh(true);
    closeModal();
  };

  const onChangeTopic = (e) => {
    if (e.target.checked) {
      setTopic("true");
    } else {
      setTopic("false");
    }
  };

  const onChangeFillout = (e) => {
    setFillout(e.target.value);
  };

  useEffect(() => {
    setLocation();
  }, []);

  useEffect(() => {
    if (typeof token === "string") {
      let userInfo = jwt_decode(token);
      setUser(userInfo);
    }
  }, [token]);

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="writerModal"
    >
      <section>
        <header>
          <img src={process.env.PUBLIC_URL + "/images/profileImg.png"}></img>
          <div>
            <h4>{user?.usernickname}</h4>
            <p>{user?.useremail}</p>
          </div>
        </header>
        <main>
          <p id="topicHeader">주제선택</p>
          <div id="topic">
            <div className="round">
              <input
                type="checkbox"
                id="checkbox"
                name="topic"
                value="false"
                onChange={onChangeTopic}
              />
              <label htmlFor="checkbox"></label>
            </div>
            <p>오늘 먹은(먹을) 점심은?</p>
          </div>

          <p id="attachmentsHeader">첨부항목</p>
          <Dropzone
            files={files}
            setFiles={setFiles}
            fileCount={fileCount}
            setFileCount={setFileCount}
          />
          <p id="fillout_header">작성란</p>
          <div id="fillout">
            <form>
              <p>
                <textarea
                  cols="100"
                  rows="4"
                  onChange={onChangeFillout}
                  maxLength="200"
                ></textarea>
              </p>
            </form>
          </div>
        </main>
        <footer>
          <button id="cancel" onClick={closeModal}>
            취소
          </button>
          <button id="submit" onClick={submit}>
            확인
          </button>
        </footer>
      </section>
    </Modal>
  );
};

export default Writer;
