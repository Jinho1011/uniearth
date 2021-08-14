import React, { useState, useEffect } from "react";

import MyPosts from "../components/MyPosts";
import MyProfile from "../components/MyProfile";

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <MyPosts></MyPosts>
      <MyProfile></MyProfile>
    </>
  );
};

export default Profile;
