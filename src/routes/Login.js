import React, { useState, useEffect } from "react";

const Login = () => {
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

  const submit = async () => {};

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
      <button onClick={submit}>Sign Up</button>
    </>
  );
};

export default Login;
