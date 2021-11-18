import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import Homepage from '../images/Homepage.png';
import Fitness from '../images/fitness.jpeg';
import FullPageLoading from './FullPageLoading';

const StyledBanner = styled.img`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const StyledMainTextContainer = styled.div`
  position: relative;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledMainText = styled.div`
  font-size: 80px;
  color: white;
  letter-spacing: 2px;
`;

const StyledMainTextWord = styled.span`
  font-size: 80px;
  color: #1face1;
`;

const StyledScrollToDownText = styled.div`
  font-size: 30px;
  width: 100px;
  color: white;
  letter-spacing: 5px;
  position: absolute;
  bottom: 100px;
  left: calc(50% - 50px);
  text-align: center;
`;

const StyledScrollToDownIcon= styled.span`
  position: absolute;
  bottom: 150px;
  left: 50%;
  width: 46px;
  height: 46px;
  margin-left: -23px;
  border: 1px solid #fff;
  border-radius: 100%;
  box-sizing: border-box;
  z-index: 1;
  cursor: pointer;

  &:after{
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    width: 16px;
    height: 16px;
    margin: -12px 0 0 -8px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-45deg);
    box-sizing: border-box;
  }

  &:before{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    content: '';
    width: 44px;
    height: 44px;
    box-shadow: 0 0 0 0 rgba(255,255,255,0.3);
    border-radius: 100%;
    opacity: 0;
    animation: sdb03 3s infinite;
    box-sizing: border-box;  
  }

  @keyframes sdb03 {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    60% {
      box-shadow: 0 0 0 60px rgba(255,255,255,.1);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;

const StyledMainContainer = styled.div`
  height: calc(100vh - 80px);
  background: transparent;
  position: relative;
  display: flex;
`;

const StyledMainImageContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  background-color: #1face1;
  z-index: 1;

  &:before {
    content: "";
    background-image: url(${Fitness});
    background-position-x: 7%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute; 
    z-index: -1;
  } 
`;

const StyledMainWordContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  padding: 7% 8% 7% 5%;
`;

const StyledStepContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  margin-bottom: 3%;
  align-items: center;
`;

const StyledStepTextContainer = styled.div`
  width: 100%;
`;

const StyledStepTextTitle = styled.div`
  font-size: 35px;
  color: #1face1;
  margin-bottom: 10px;
`;

const StyledStepTextContent = styled.div`
  font-size: 20px;
  color: #666666;
`;

export default function HomePage({currentUser}) {
  return currentUser !== undefined ? (
    <>
      <Header />
      <StyledBanner src={Homepage} />
      <StyledMainTextContainer>
        <StyledMainText>BUILD YOUR <StyledMainTextWord>UNIQUE</StyledMainTextWord> FITNESS</StyledMainText>
        <StyledScrollToDownIcon onClick={() => {
          window.scrollTo({ top: 1500, left: 0, behavior: 'smooth' })
        }}></StyledScrollToDownIcon>
        <StyledScrollToDownText>GUIDE</StyledScrollToDownText>
      </StyledMainTextContainer>
      <StyledMainContainer>
        <StyledMainImageContainer />
        <StyledMainWordContainer>
          <StyledStepContainer>
            <StyledStepTextContainer>
              <StyledStepTextTitle>1. Collect / Create Your Workouts</StyledStepTextTitle>
              <StyledStepTextContent>Take a look at all the fantastic workouts uploaded from the UniqueFit community and collect those you like for further plan creations. If you're willing to share, welcome to create your own workouts!</StyledStepTextContent>
            </StyledStepTextContainer>
          </StyledStepContainer>
          <StyledStepContainer>
            <StyledStepTextContainer>
              <StyledStepTextTitle>2. Collect / Create Your Plans</StyledStepTextTitle>
              <StyledStepTextContent>With your workout collections, order and create your own plans to build strength and stay fit! Collect other amazing plans to enrich your workout routines!</StyledStepTextContent>
            </StyledStepTextContainer>
          </StyledStepContainer>
          <StyledStepContainer>
            <StyledStepTextContainer>
              <StyledStepTextTitle>3. Manage Your Unique Fitness</StyledStepTextTitle>
              <StyledStepTextContent>Edit and manage your collections and creations for improvements. Be sure to schedule your training and get informations of nearby gyms!</StyledStepTextContent>
            </StyledStepTextContainer>
          </StyledStepContainer>
        </StyledMainWordContainer>
      </StyledMainContainer>
    </>
  ) : <FullPageLoading/>;
}
