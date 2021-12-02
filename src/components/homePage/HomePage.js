import React from 'react';
import styled from 'styled-components';

import Header from '../common/Header';
import FullPageLoading from '../common/FullPageLoading';
import { scrollDown } from '../../utils/animation';
import HomepageBackground from '../../images/home-page-background.jpeg';
import GuideBackground from '../../images/guide-background.jpeg';

export default function HomePage({ currentUser }) {
  return currentUser !== undefined ? (
    <>
      <Header />
      <StyledBanner src={HomepageBackground} />
      <StyledMainTextContainer>
        <StyledMainText>
          BUILD YOUR <StyledMainTextWord>UNIQUE</StyledMainTextWord> FITNESS
        </StyledMainText>
        <StyledScrollToDownIcon
          onClick={() => {
            window.scrollTo({ top: 1500, left: 0, behavior: 'smooth' });
          }}
        ></StyledScrollToDownIcon>
        <StyledScrollToDownText>GUIDE</StyledScrollToDownText>
      </StyledMainTextContainer>
      <StyledMainContainer>
        <StyledMainImageContainer />
        <StyledMainWordContainer>
          <StyledStepContainer>
            <StyledStepTextContainer>
              <StyledStepTextTitle>
                1. Collect / Create Your Workouts
              </StyledStepTextTitle>
              <StyledStepTextContent>
                Take a look at all the fantastic workouts uploaded from the
                UniqueFit community and collect those you like for further plan
                creations. If you're willing to share, welcome to create your
                own workouts!
              </StyledStepTextContent>
            </StyledStepTextContainer>
          </StyledStepContainer>
          <StyledStepContainer>
            <StyledStepTextContainer>
              <StyledStepTextTitle>
                2. Collect / Create Your Plans
              </StyledStepTextTitle>
              <StyledStepTextContent>
                With your workout collections, order and create your own plans
                to build strength and stay fit! Collect other amazing plans to
                enrich your workout routines!
              </StyledStepTextContent>
            </StyledStepTextContainer>
          </StyledStepContainer>
          <StyledStepContainer>
            <StyledStepTextContainer>
              <StyledStepTextTitle>
                3. Manage Your Unique Fitness
              </StyledStepTextTitle>
              <StyledStepTextContent>
                Edit and manage your collections and creations for improvements.
                Be sure to schedule your training and get informations of nearby
                gyms!
              </StyledStepTextContent>
            </StyledStepTextContainer>
          </StyledStepContainer>
        </StyledMainWordContainer>
      </StyledMainContainer>
    </>
  ) : (
    <FullPageLoading />
  );
}

const StyledBanner = styled.img`
  object-fit: cover;
  object-position: right;
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
  font-size: 50px;
  color: white;
  letter-spacing: 2px;
  @media (min-width: 800px) {
    font-size: 80px;
  }
`;

const StyledMainTextWord = styled.span`
  font-size: 50px;
  color: #1face1;
  @media (min-width: 800px) {
    font-size: 80px;
  }
`;

const StyledScrollToDownText = styled.div`
  font-size: 30px;
  width: 100px;
  color: white;
  letter-spacing: 5px;
  position: absolute;
  bottom: 50px;
  left: calc(50% - 50px);
  text-align: center;
  @media (min-width: 800px) {
    bottom: 100px;
  }
`;

const StyledScrollToDownIcon = styled.span`
  position: absolute;
  bottom: 100px;
  left: 50%;
  width: 46px;
  height: 46px;
  margin-left: -23px;
  border: 1px solid #fff;
  border-radius: 100%;
  box-sizing: border-box;
  z-index: 1;
  cursor: pointer;
  @media (min-width: 500px) {
    bottom: 150px;
  }

  &:after {
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

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    content: '';
    width: 44px;
    height: 44px;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
    border-radius: 100%;
    opacity: 0;
    animation: ${scrollDown} 3s infinite;
    box-sizing: border-box;
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
    content: '';
    background-image: url(${GuideBackground});
    background-position-x: 50%;
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
  overflow-y: scroll;
`;

const StyledStepContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  margin-bottom: 3%;
  align-items: center;

  @media (min-width: 600px) {
    height: 250px;
  }

  @media (min-width: 800px) {
    height: 30%;
  }
`;

const StyledStepTextContainer = styled.div`
  width: 100%;
`;

const StyledStepTextTitle = styled.div`
  font-size: 20px;
  color: #1face1;
  margin-bottom: 10px;

  @media (min-width: 500px) {
    font-size: 35px;
  }
`;

const StyledStepTextContent = styled.div`
  font-size: 15px;
  color: #666666;

  @media (min-width: 500px) {
    font-size: 20px;
  }
`;
