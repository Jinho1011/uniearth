import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { sha256 } from "js-sha256";

import key from "../key";

import { Background } from "../components/Background";
import Header from "../components/Header";
import "../styles/form.css";
import styled from "styled-components";

const SignUp = () => {
  const [isDone, setDone] = useState(false);
  const [sex, setSex] = useState("");
  const [inputs, setInputs] = useState({
    id: "",
    pwd: "",
    nick: "",
    location: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const signup = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${key}`);

    var raw = JSON.stringify({
      uniearth_user_id: inputs.id,
      uniearth_user_pw: sha256(inputs.pwd),
      uniearth_user_nickname: inputs.nick,
      uniearth_user_sex: sex == "male" ? 0 : 1,
      uniearth_user_address: inputs.location,
      uniearth_user_phone: "",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("/uniearth/users", requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
  };

  const initLocation = () => {
    setInputs({
      ...inputs,
      location: "대한민국, 서울",
    });
  };

  const submit = async () => {
    let res = await signup();
    res = JSON.parse(res);

    if (res.code === "201") {
      // success
      setDone(true);
    } else {
      // error
      alert(res.error.message);
    }
  };

  return (
    <Background>
      <Header></Header>
      <div className="form-container">
        <div className="form-wrapper">
          <h1 className="form-title">Register</h1>
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
            <input
              name="nick"
              className="form-input"
              placeholder="닉네임을 입력해주세요"
              onChange={onChange}
              value={inputs.nick}
            ></input>
            <div className="input-sex">
              <>
                <input
                  type="radio"
                  id="male"
                  readOnly
                  checked={sex === "male"}
                  onClick={() => setSex("male")}
                ></input>
                <label htmlFor="male">남성</label>
              </>
              <>
                <input
                  type="radio"
                  id="female"
                  readOnly
                  checked={sex === "female"}
                  onClick={() => setSex("female")}
                ></input>
                <label htmlFor="male">여성</label>
              </>
            </div>
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
            회원가입
          </button>
        </div>
      </div>
      {isDone ? <Redirect to="/login" /> : null}
    </Background>
    // <>
    //   <h1>SignUp</h1>
    //   <div>
    //     아이디
    //     <input name="id" onChange={onChange} value={inputs.id}></input>
    //   </div>
    //   <div>
    //     비밀번호
    //     <input name="pwd" onChange={onChange} value={inputs.pwd}></input>
    //   </div>
    //   <div>
    //     닉네임
    //     <input name="nick" onChange={onChange} value={inputs.nick}></input>
    //   </div>
    //   <div>
    //     주소
    //     <button onClick={initLocation}>현재 위치로</button>
    //   </div>
    //   <div>
    //
    //   </div>

    // </>
  );
};

export default SignUp;
