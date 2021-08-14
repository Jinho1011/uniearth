export default () => {
  let isLogin = sessionStorage.getItem("JWT");
  return isLogin ? true : false;
};
