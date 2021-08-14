import React, { useState } from 'react';
import profileImg from "../images/logo_profile.png";
import scope_logo from "../images/scope.png";

import '../css/MyProfile.css';

const MyProfile = () => {

    const [pw, setPW] = useState("");
    const [over, setOver] = useState(false);
    const [text, setText] = useState("잘못된 비밀번호입니다");
    const [over2, setOver2] = useState(false);

    const pwCheck = () => {
        if (pw === "12345678") {
            setOver(true);
            setText("변경되었습니다");
            setOver2(false);
        }
        else {
            profileChange();
        }
    };

    const pwChange = (e) => {
        setPW(e.target.value);
    };

    const profileChange = () => {
        setOver2(true);
    };

    return (
        <div className="profile">
            <div className="profile_check" style={over ? { display : "none" } : {}}>
                <div className="profile_check_exp">비밀번호를 입력해주세요</div>
                <input type="password" className="profile_pwcheck" maxLength="15" onChange={pwChange} />
                <div className="profile_check_findPw">비밀번호 찾기</div>
                <div className="profile_check_button" onClick={pwCheck}>확인</div>
            </div>

            <div className="profile_left" style={over ? { display : "flex" } : {}}>
            <div className="profile_sum">
                <div className="profile_img">
                    <img src={profileImg} alt="img" />
                </div>
                <div className="profile_sum_info">
                    <div className="profile_sum_info_top">
                        <div className="profile_sum_nickname">
                            닉네임
                        </div>
                        <div className="profile_sum_email">
                            12345@konkuk.ac.kr
                        </div>
                    </div>
                    
                    <div className="profile_sum_change">
                        프로필 사진 변경
                    </div>
                </div>
            </div>
            <div className="profile_setting">
                <div className="profile_nickname">
                    <div className="profile_title">
                        닉네임
                    </div>
                    <input type="text" className="profile_set" defaultValue="닉네임" />
                    <div className="profile_exp">
                        <p>서비스에서 사용하는 닉네임입니다.</p>
                        <p>대부분의 경우 14일 이내에 다시 기존 닉네임으로 변경할 수 있습니다.</p>
                    </div>
                </div>
                <div className="profile_pw">
                    <div className="profile_title">
                        비밀번호
                    </div>
                    <input type="password" className="profile_set" defaultValue="12345678" maxLength="15" />
                </div>
                <div className="profile_loca">
                    <div className="profile_title">
                        위치
                    </div>
                    <div className="profile_set" id="profile_set">
                        <div>대한민국, 서울</div>
                        <img src={scope_logo} alt="scope" className="profile_loca_search" />
                    </div>
                    <div className="profile_exp">
                        현재 위치를 검색합니다.
                    </div>
                </div>
                <div className="profile_phone">
                    <div className="profile_title">
                        연락처
                    </div>
                    <input type="text" className="profile_set" defaultValue="010-1234-5678"/>
                </div>
                <div className="profile_sex">
                    <div className="profile_title">
                        성별
                    </div>
                    <form className="profile_set_chk">
                    <input type="radio" name="chk_info" id="hello1" value="남성" defaultChecked="checked" /><label htmlFor="hello1">남성</label>
                    <input type="radio" name="chk_info" id="hello2" value="여성" /><label htmlFor="hello2">여성</label>
                    </form>
                </div>
            </div>
            </div>
            <div className="profile_button" style={over ? { display : "flex" } : {}}>
                <div className="profile_change_button" onClick={profileChange} style={over2 ? { color: "white", backgroundColor: "#4E89FF" } : {}}>변경하기</div>
                <div className="profile_return_button">원래대로</div>
            </div>
            <div className="profile_bottom" style={over2 ? { color: "white", backgroundColor: "#4E89FF" } : {}}>
                {text}
            </div>
        </div>
    );

}

export default MyProfile;