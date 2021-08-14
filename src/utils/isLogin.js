export default () => {
  let isLogin = sessionStorage.getItem("JWT");
  console.log("🚀 ~ file: isLogin.js ~ line 3 ~ isLogin", isLogin);
  return isLogin ? true : false;
};
