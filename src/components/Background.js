import styled from "styled-components";

export const Background = styled.div`
  background: url(${process.env.PUBLIC_URL + "/images/background.png"});
  background-size: cover;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100vh;
  padding-bottom: 100px;
`;
