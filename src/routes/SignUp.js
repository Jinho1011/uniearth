import React, { useState, useEffect } from "react";
import { sha256 } from "js-sha256";

const SignUp = () => {
  const [isDone, setDone] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    pwd: "",
    nick: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = async () => {
    console.log(inputs);
  };

  return (
    <>
      <h1>SignUp</h1>
      <div>
        아이디
        <input name="id" onChange={onChange} value={inputs.id}></input>
      </div>
      <div>
        비밀번호
        <input name="pwd" onChange={onChange} value={inputs.pwd}></input>
      </div>
      <div>
        닉네임
        <input name="nick" onChange={onChange} value={inputs.nick}></input>
      </div>

      {isDone ? <Redirect to="/login" /> : null}

      <button onClick={submit}>Sign Up</button>
    </>
  );
};

export default SignUp;
