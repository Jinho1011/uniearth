import styled from "styled-components";

export const Background = styled.div`
  background: url(${process.env.PUBLIC_URL + "/images/background.png"});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;
