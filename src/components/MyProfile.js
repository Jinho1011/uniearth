import { add } from "lodash";
import React, { useState, useEffect } from "react";
import { sha256 } from "js-sha256";

import "../styles/MyProfile.css";

const MyProfile = ({ user }) => {
  const [pw, setPW] = useState("");
  const [over, setOver] = useState(false);
  const [text, setText] = useState("잘못된 비밀번호입니다");
  const [over2, setOver2] = useState(false);
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState("");

  const [newNick, setNick] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newSex, setNewSex] = useState();

  const onNickChange = (e) => {
    setNick(e.target.value);
  };

  const onPwChange = (e) => {
    setNewPw(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onMaleChange = () => {
    setNewSex("0");
  };

  const onFemaleChange = () => {
    setNewSex("1");
  };

  const pwCheck = () => {


    if (pw === "12345678") {
      setOver(true);

      function startUser() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
        );

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        return fetch(
          "/uniearth/users/uniearth_user_id/" + user?.useremail,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            //let res = await initPhone();
            let res = JSON.parse(result);
            let phones = res?.users[0].uniearth_user_phone;
            console.log(res?.users[0].uniearth_user_address);

            let addressSet = res?.users[0].uniearth_user_address;
            console.log(addressSet);
            var splits = addressSet.split(", ");
            console.log(splits.length);
            var city = splits[1];
            var country = splits[0];

            setAddress([city, country]);
            setPhone(phones);
            setNick(user?.usernickname);
            setNewSex(user?.sex);
          })
          .catch((error) => console.log("error", error));
      }

      startUser();

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
    // inputs에 있는 값들 얻어올 수 있게끔
    setOver2(true);
    console.log(newNick, newPw, phone, newSex);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 383d6d665c39497ab039a16c88d5843f9dcafe4b337dfecf5c38f18c81c2f98b"
    );

    var raw = JSON.stringify({
      uniearth_user_id: user?.useremail,
      uniearth_user_pw: sha256(newPw),
      uniearth_user_phone: phone != "" ? phone : user.uniearth_user_phone,
      uniearth_user_sex: newSex,
      uniearth_user_address: address[1] + ", " + address[0],
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/uniearth/users/uniearth_user_id/" + user?.useremail, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
          setAddress([]);
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
            {
              <img
                src={process.env.PUBLIC_URL + "/images/profileImgFull.png"}
                alt="scope"
              />
            }
          </div>
          <div className="profile_sum_info">
            <div className="profile_sum_info_top">
              <div className="profile_sum_nickname">{user?.usernickname}</div>
              <div className="profile_sum_email">{user?.useremail}</div>
            </div>

            <div className="profile_sum_change">프로필 사진 변경</div>
          </div>
        </div>
        <div className="profile_setting">
          <div className="profile_nickname">
            <div className="profile_title">닉네임</div>
            <input
              type="text"
              className="profile_set"
              onChange={onNickChange}
              defaultValue={user?.usernickname}
            />
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
              onChange={onPwChange}
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
              onChange={onPhoneChange}
              defaultValue={phone}
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
                onClick = {onMaleChange}
                defaultChecked= {user?.sex === "0" ? "checked" : null }
              />
              <label htmlFor="hello1">남성</label>
              <input type="radio" name="chk_info" id="hello2" value="여성" onClick={onFemaleChange} defaultChecked= {user?.sex === "0" ? null : "checked" }/>
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
        className="profile_bottom container is-max-desktop"
        style={over2 ? { color: "white", backgroundColor: "#4E89FF" } : {}}
      >
        {text}
      </div>
    </div>
  );
};

export default MyProfile;
