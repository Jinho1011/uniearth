const isLogin = () => {
  let res = window.sessionStorage.getItem("JWT");
  if (res == null) return false;
  else return true;
};

export default isLogin;
