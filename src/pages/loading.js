import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as ReactLogo } from "../components/simbolo.svg";
//import { Logo as ReactLogo } from '../components/logo-g';
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const scale = keyframes`
0% {
  transform: scale(1);
}
25% {
  transform: scale(1.2);
}
100% {
  transform: scale(1);
}
`;

const StyledLogo = styled(ReactLogo)`
  animation: ${rotate} infinite 1.5s linear;
  animation: ${scale} infinite 1.5s linear;
  height: 25rem;
  width: 25rem;
  display: block;
  margin: auto;
`;

function Loading() {
  return (
    <React.Fragment>
      <div style={{ paddingTop: "80px" }}>
        <StyledLogo />
      </div>
    </React.Fragment>
  );
}

export default Loading
