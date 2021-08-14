import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import Dropzone from "./Dropzone";
import "../styles/Writer.css";
import Axios from "axios";

Modal.setAppElement(document.getElementById("root"));

const Writer = ({ showModal, setShowModal }) => {
  const inputRef = useRef(null);

  const [topic, setTopic] = useState("false");
  //const [keyword, setKeyword] = useState("");
  const [files, setFiles] = useState([]);
  const [fillout, setFillout] = useState("");

  // useEffect(() => {
  //   console.log(fillout);
  // }, [fillout]);

  const closeModal = () => {
    setShowModal(false);
  };

  const submit = () => {
    // console.log({topic});
    // console.log({files});
    // console.log({fillout});

    Axios.post(
      "/uniearth/topics",
      {
        topic,
      },
      {
        "content-type": "application/json;charset=utf-8;",
      }
    ).then((res) => {
      console.log(res);
    });

    closeModal();
  };

  const onChangeTopic = (e) => {
    if (e.target.checked) {
      setTopic(e.target.value);
    } else {
      setTopic("false");
    }
  };

  // useEffect(() => {
  //   console.log(files)
  // }, [files])

  const onChangeFillout = (e) => {
    setFillout(e.target.value);
  };

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
            <h4>닉네임</h4>
            <p>대한민국 8월 8일 오전 10:00</p>
          </div>
        </header>
        <main>
          <p id="topic_header">주제선택</p>
          <div id="topic">
            <div className="topic_category">
              <input
                type="checkbox"
                id="topic"
                name="topic"
                value="true"
                onChange={onChangeTopic}
              />
              <label for="topic">오늘 먹은(먹을) 점심은?</label>
            </div>
          </div>
          <p id="attachments_header">첨부항목</p>
          <Dropzone files={files} setFiles={setFiles} />
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
