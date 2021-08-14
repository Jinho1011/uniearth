import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { sha256 } from "js-sha256";

import { Background } from "../components/Background";
import Header from "../components/Header";
import "../styles/form.css";
import styled from "styled-components";

const Login = () => {
  const [isDone, setDone] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    pwd: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${sha256(inputs.id.concat("dogood_mkweb_api"))}`
    );

    var raw = JSON.stringify({
      user_id: inputs.id,
      user_pw: sha256(inputs.pwd),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("/auth/login", requestOptions)
      .then((response) => {
        return { code: response.status, data: response.text() };
      })
      .then((result) => result)
      .catch((error) => error);
  };

  const submit = async () => {
    let { code, data } = await login();
    if (code === 200) {
      data = JSON.parse(await data);
      window.sessionStorage.setItem("JWT", data.token);
      setDone(true);
    } else {
      alert("login failed");
    }
  };

  return (
    <Background>
      <Header></Header>
      <div className="form-container">
        <div className="form-wrapper">
          <h1 className="form-title">Sign In</h1>
          <div className="input-container">
            <input
              name="id"
              className="form-input"
              placeholder="이메일을 입력해주세요"
              onChange={onChange}
              value={inputs.id}
            ></input>
            <input
              type="password"
              name="pwd"
              className="form-input"
              placeholder="비밀번호를 입력해주세요"
              onChange={onChange}
              // value={inputs.pwd}
            ></input>
          </div>
          <div className="form-etc">
            <div className="form-select-container">
              <div className="round">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
              </div>
              <div style={{ color: "#fff" }}>자동 로그인</div>
            </div>
            <a>비밀번호 찾기</a>
          </div>

          <button className="form-button" onClick={submit}>
            로그인
          </button>
        </div>
      </div>
      {isDone ? <Redirect to="/" /> : null}
    </Background>
  );
};

export default Login;
