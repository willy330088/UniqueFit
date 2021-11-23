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
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledText = styled.div`
  color: white;
  font-size: 60px;
  position: absolute;
  top: 25%;
`;

const StyledRedirectBtn = styled.div`
  font-size: 35px;
  height: 60px;
  width: 200px;
  cursor: pointer;
  color: #1face1;
  border-radius: 5px;
  background-color: transparent;
  text-align: center;
  line-height: 60px;
  border: 2px solid #1face1;
  position: absolute;
  top: 40%;

  &:hover {
    color: white;
    background-color: #1face1;
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
