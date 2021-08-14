import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { sha256 } from "js-sha256";
import jwt_decode from "jwt-decode";

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
      let decoded = jwt_decode(data.token);
      window.sessionStorage.setItem("JWT", decoded);
      setDone(true);
    } else {
      alert("login failed");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        아이디
        <input name="id" onChange={onChange} value={inputs.id}></input>
      </div>
      <div>
        비밀번호
        <input name="pwd" onChange={onChange} value={inputs.pwd}></input>
      </div>
      {isDone ? <Redirect to="/" /> : null}
      <button onClick={submit}>Sign Up</button>
    </>
  );
};

export default Login;
