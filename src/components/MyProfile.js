import { add } from "lodash";
import React, { useState, useEffect } from "react";

import "../styles/MyProfile.css";

const MyProfile = () => {
  const [pw, setPW] = useState("");
  const [over, setOver] = useState(false);
  const [text, setText] = useState("잘못된 비밀번호입니다");
  const [over2, setOver2] = useState(false);
  const [address, setAddress] = useState([]);

  const pwCheck = () => {
    if (pw === "12345678") {
      setOver(true);
      setText("변경되었습니다");
      setOver2(false);
    } else {
      profileChange();
    }
  };

  const pwChange = (e) => {
    setPW(e.target.value);
  };

  const profileChange = () => {
    setOver2(true);
  };

  const setLocation = () => {
    if (!navigator.geolocation) {
      console.log("사용자의 브라우저는 지오로케이션을 지원하지 않습니다.");
      return;
    }

    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

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
          console.log(
            "🚀 ~ file: MyProfile.js ~ line 52 ~ .then ~ address_comps",
            address_comps
          );
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
      console.log("사용자의 위치를 찾을 수 없습니다.");
    }
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);

    // https://maps.googleapis.com/maps/api/geocode/json?latlng=37,128&sensor=false&key=AIzaSyBR8RbKAXpP4kTkcQVBm_2E5jU19lb9LYo
  };

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <div className="profile">
      <div className="profile_check" style={over ? { display: "none" } : {}}>
        <div className="profile_check_exp">비밀번호를 입력해주세요</div>
        <input
          type="password"
          className="profile_pwcheck"
          maxLength="15"
          onChange={pwChange}
        />
        <div className="profile_check_findPw">비밀번호 찾기</div>
        <div className="profile_check_button" onClick={pwCheck}>
          확인
        </div>
      </div>

      <div className="profile_left" style={over ? { display: "flex" } : {}}>
        <div className="profile_sum">
          <div className="profile_img">
            
            {<img src={process.env.PUBLIC_URL + "/images/profileImgFull.png"}
                  alt="scope"/> }
          </div>
          <div className="profile_sum_info">
            <div className="profile_sum_info_top">
              <div className="profile_sum_nickname">닉네임</div>
              <div className="profile_sum_email">12345@konkuk.ac.kr</div>
            </div>

            <div className="profile_sum_change">프로필 사진 변경</div>
          </div>
        </div>
        <div className="profile_setting">
          <div className="profile_nickname">
            <div className="profile_title">닉네임</div>
            <input type="text" className="profile_set" defaultValue="닉네임" />
            <div className="profile_exp">
              <p>서비스에서 사용하는 닉네임입니다.</p>
              <p>
                대부분의 경우 14일 이내에 다시 기존 닉네임으로 변경할 수
                있습니다.
              </p>
            </div>
          </div>
          <div className="profile_pw">
            <div className="profile_title">비밀번호</div>
            <input
              type="password"
              className="profile_set"
              defaultValue="12345678"
              maxLength="15"
            />
          </div>
          <div className="profile_loca">
            <div className="profile_title">위치</div>
            <div className="profile_set" id="profile_set">
              <div>
                {address.length ? (
                  <div>
                    {address[1]}, {address[0]}
                  </div>
                ) : null}
              </div>
              <a onClick={setLocation}>
                <img
                  src={process.env.PUBLIC_URL + "/images/scope_logo.png"}
                  alt="scope"
                  className="profile_loca_search"
                />
              </a>
            </div>
            <div className="profile_exp">현재 위치를 검색합니다.</div>
          </div>
          <div className="profile_phone">
            <div className="profile_title">연락처</div>
            <input
              type="text"
              className="profile_set"
              defaultValue="010-1234-5678"
            />
          </div>
          <div className="profile_sex">
            <div className="profile_title">성별</div>
            <form className="profile_set_chk">
              <input
                type="radio"
                name="chk_info"
                id="hello1"
                value="남성"
                defaultChecked="checked"
              />
              <label htmlFor="hello1">남성</label>
              <input type="radio" name="chk_info" id="hello2" value="여성" />
              <label htmlFor="hello2">여성</label>
            </form>
          </div>
        </div>
      </div>
      <div className="profile_button" style={over ? { display: "flex" } : {}}>
        <div
          className="profile_change_button"
          onClick={profileChange}
          style={over2 ? { color: "white", backgroundColor: "#4E89FF" } : {}}
        >
          변경하기
        </div>
        <div className="profile_return_button">원래대로</div>
      </div>
      <div
        className="profile_bottom"
        style={over2 ? { color: "white", backgroundColor: "#4E89FF" } : {}}
      >
        {text}
      </div>
    </div>
  );
};

export default MyProfile;
