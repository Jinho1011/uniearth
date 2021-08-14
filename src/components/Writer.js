import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

const Writer = ({ showModal, setShowModal }) => {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      HI
    </Modal>
  );
};

export default Writer;
