import React, { useState } from 'react';
import LandingPageBackground from '../../images/landingPageBackground.jpeg';
import LogoDumbbell from '../../images/logoDumbbell.png';
import styled from 'styled-components';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SignInPopup from '../common/SignInPopup';

const StyledLogoDumbbell = styled.img`
  position: absolute;
  width: 33px;
  top: 13px;
  right: 48px;

  @media (min-width: 700px) {
    width: 50px;
    top: 20px;
    right: 68px;
  }

  @media (min-width: 950px) {
    width: 65px;
    top: 28px;
    right: 81px;
  }
`;

const StyledLandingPageContainer = styled.div`
  background-image: url(${LandingPageBackground});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  background-position-x: 35%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 950px) {
    background-position-x: center;
    background-position-y: center;
  }
`;

const StyledLogoContainer = styled.div`
  position: absolute;
  top: 30%;
`;

const StyledLogoText = styled.div`
  font-size: 80px;
  color: #1face1;

  &:after {
    content: 'F T';
    color: white;
    letter-spacing: 10px;
  }

  @media (min-width: 700px) {
    font-size: 120px;
    &:after {
      letter-spacing: 13px;
    }
  }

  @media (min-width: 950px) {
    font-size: 160px;
  }
`;

const StyledSlogan = styled.div`
  color: white;
  font-weight: bolder;
  font-size: 25px;
  position: absolute;
  top: 55%;
  text-align: center;
  letter-spacing: 1px;

  @media (min-width: 700px) {
    font-size: 35px;
  }
`;

const StyledBtnContainer = styled.div`
  display: flex;
  position: absolute;
  top: 75%;
  justify-content: space-between;
  width: 320px;

  @media (min-width: 550px) {
    width: 350px;
  }
`;

const StyledLoginBtn = styled.button`
  color: white;
  font-size: 20px;
  height: 40px;
  width: 150px;
  border-radius: 20px;
  border: solid 3px #1face1;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #1face1;
  }
`;

const StyledGuestBtn = styled.button`
  color: white;
  font-size: 20px;
  height: 40px;
  width: 150px;
  border-radius: 20px;
  border: solid 3px #1face1;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #1face1;
  }
`;

export default function LandingPage() {
  AOS.init();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  // const [loading, setLoading] = useState(false);

  return (
    <StyledLandingPageContainer>
      <StyledLogoContainer data-aos="fade-down" data-aos-duration="3000">
        <StyledLogoText>UNIQUE</StyledLogoText>
        <StyledLogoDumbbell src={LogoDumbbell} />
      </StyledLogoContainer>
      <StyledSlogan data-aos="fade-up" data-aos-duration="3000">
        COMMIT TO BE FIT <br />
        <br /> TOO UNIQUE TO QUIT
      </StyledSlogan>
      <StyledBtnContainer>
        <StyledLoginBtn
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-delay="2000"
          onClick={() => {
            setOpen(true);
          }}
        >
          Join Now
        </StyledLoginBtn>
        <StyledGuestBtn
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-delay="2000"
          onClick={() => {
            history.push('/home');
          }}
        >
          Guest
        </StyledGuestBtn>
      </StyledBtnContainer>
      <SignInPopup open={open} closeModal={closeModal} />
    </StyledLandingPageContainer>
  );
}
