import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import NotFoundPageBackground from '../images/notFoundPageBackground.jpeg';

const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${NotFoundPageBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledText = styled.div`
  color: white;
  font-size: 30px;
  position: absolute;
  top: 25%;
  text-align: center;
  width: 90%;

  @media (min-width: 800px) {
    font-size: 60px;
  }
`;

const StyledRedirectBtn = styled.div`
  font-size: 25px;
  height: 40px;
  width: 120px;
  cursor: pointer;
  color: #1face1;
  border-radius: 5px;
  background-color: transparent;
  text-align: center;
  line-height: 40px;
  border: 2px solid #1face1;
  position: absolute;
  top: 45%;

  &:hover {
    color: white;
    background-color: #1face1;
  }

  @media (min-width: 800px) {
    top: 40%;
    font-size: 35px;
    height: 60px;
    width: 200px;
    line-height: 60px;
  }
`;

export default function NotFoundPage() {
  const history = useHistory();
  return (
    <StyledBackground>
      <StyledText>The page you were looking for doesn't exist...</StyledText>
      <StyledRedirectBtn
        onClick={() => {
          history.push('./home');
        }}
      >
        Go Back
      </StyledRedirectBtn>
    </StyledBackground>
  );
}
