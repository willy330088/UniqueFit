import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import NotFoundPageBackground from '../../images/notFoundPageBackground.jpeg';
import { StyledGeneralBtn } from '../common/GeneralStyle';

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

const StyledRedirectBtn = styled(StyledGeneralBtn)`
  font-size: 25px;
  height: 40px;
  width: 120px;
  line-height: 40px;
  position: absolute;
  top: 45%;

  @media (min-width: 800px) {
    top: 40%;
    font-size: 35px;
    height: 60px;
    width: 200px;
    line-height: 60px;
  }
`;
