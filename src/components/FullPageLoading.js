import React from 'react'
import styled from 'styled-components';
import LogoDumbbell from '../images/logoDumbbell.png';

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222d35;
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;

  div:nth-child(1) {
    animation: blurring 1.2s linear 0s infinite alternate;
  }
  div:nth-child(2) {
    animation: blurring 1.2s linear 0.15s infinite alternate;
  }
  div:nth-child(3) {
    animation: blurring 1.2s linear 0.3s infinite alternate;
  }

  div:nth-child(4) {
    animation: blurring 1.2s linear 0.45s infinite alternate;
  }

  div:nth-child(5) {
    animation: blurring 1.2s linear 0.6s infinite alternate;
  }

  div:nth-child(6) {
    animation: blurring 1.2s linear 0.75s infinite alternate;
  }

  div:nth-child(7) {
    animation: blurring 1.2s linear 0.9s infinite alternate;
  }

  div:nth-child(8) {
    animation: blurring 1.2s linear 1.05s infinite alternate;
  }

  div:nth-child(9) {
    animation: blurring 1.2s linear 1.2s infinite alternate;
  }

  @keyframes blurring {
    0% {
      filter: blur(0);
    }
    100% {
      filter: blur(6px);
    }
  }
`;

const StyledLogoText1 = styled.div`
  font-size: 100px;
  color: #1face1;
  margin: 0 5px;
`;

const StyledLogoText2 = styled.div`
  font-size: 100px;
  color: white;
  margin: 0 5px;
`;

const StyledLogoDumbbell = styled.div`
  background-image: url(${LogoDumbbell});
  background-repeat: no-repeat;
  background-size: cover;
  width: 40px;
  height: 80px;
  margin: 0 5px;
`;

export default function FullPageLoading() {
  return (
    <StyledOverlay>
      <StyledLogoContainer>
        <StyledLogoText1>U</StyledLogoText1>
        <StyledLogoText1>N</StyledLogoText1>
        <StyledLogoText1>I</StyledLogoText1>
        <StyledLogoText1>Q</StyledLogoText1>
        <StyledLogoText1>U</StyledLogoText1>
        <StyledLogoText1>E</StyledLogoText1>
        <StyledLogoText2>F</StyledLogoText2>
        <StyledLogoDumbbell src={LogoDumbbell} />
        <StyledLogoText2>T</StyledLogoText2>
      </StyledLogoContainer>
    </StyledOverlay>
  )
}
