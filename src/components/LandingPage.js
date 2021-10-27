import React, { useState } from 'react';
import HomePageBackground from '../images/homePageImage.jpeg';
import Fit from '../images/fit.jpeg';
import Logo from '../images/logo.png';
import Facebook from '../images/facebook.png';
import Google from '../images/google.png';
import styled, {keyframes} from 'styled-components';
import Popup from 'reactjs-popup';
import firebase from '../utils/firebase';
import 'firebase/auth';
import { facebookProvider, googleProvider } from '../utils/authMethod';
import socialMediaAuth from '../utils/auth';
import { useHistory } from 'react-router-dom';

const StyledBackGround = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const StyledLogo = styled.img`
  width: 50%;
  position: absolute;
  top: 30%;
  left: 25%;
`;

const StyledSlogan = styled.div`
  width: 50%;
  color: white;
  font-weight: bolder;
  font-size: 35px;
  position: absolute;
  text-align: center;
  top: 55%;
  left: 25%;
`;

const StyledLoginBtn = styled.button`
  position: absolute;
  color: white;
  font-size: 20px;
  height: 40px;
  width: 10%;
  border-radius: 20px;
  border: solid 3px #1face1;
  top: 75%;
  left: 45%;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #1face1;
  }
`;

const StyledPopupImage = styled.img`
  height: 100%;
  width: 40%;
  object-fit: cover;
`;

const StyledSignInTitle = styled.div`
  text-align: center;
  font-size: 30px;
  margin: 20px 0 30px 0;
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: 65%;
  margin: 0 auto 15px;
  height: 40px;
`;

const anvil = keyframes`
  0% {
    transform: scale(1) translateY(0px);
    opacity: 0;
    box-shadow: 0 0 0 rgba(241, 241, 241, 0);
  }
  1% {
    transform: scale(0.96) translateY(10px);
    opacity: 0;
    box-shadow: 0 0 0 rgba(241, 241, 241, 0);
  }
  100% {
    transform: scale(1) translateY(0px);
    opacity: 1;
    box-shadow: 0 0 500px rgba(241, 241, 241, 0);
  }
`
const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 700px;
    display: flex;
    height: 550px;
    animation: ${anvil} 0.6s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledSeparator = styled.div`
  line-height: 30px;
  font-size: 20px;
  letter-spacing: 4px;
  color: grey;
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;

  ::before {
    position: absolute;
    content: '';
    background-color: grey;
    top: 50%;
    right: 20px;
    left: 270px;
    height: 1px;
  }

  ::after {
    position: absolute;
    content: '';
    background-color: grey;
    top: 50%;
    left: 20px;
    right: 270px;
    height: 1px;
  }
`;

const StyledSignInBtn = styled.button`
  width: 55%;
  margin: 0 auto 25px;
  height: 40px;
  background-color: #0c1863;
  color: white;
  cursor: pointer;
  border: none;
`;

const StyledSignInMediaBtn = styled.button`
  width: 65%;
  margin: 0 auto 25px;
  height: 40px;
  background-color: #0c1863;
  color: white;
  cursor: pointer;
  border: none;
  position: relative;
`;

const StyledCloseBtn = styled.button`
  background-color: transparent;
  color: #0c1863;
  cursor: pointer;
  border: none;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const StyledCreateAccountBtn = styled.button`
  background-color: transparent;
  color: #0c1863;
  cursor: pointer;
  border: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledSignInImage = styled.img`
  position: absolute;
  width: 30px;
  left: 25px;
  top: 5px;
`;

const StyledMessage = styled.div`
  color: red;
  font-weight: bold;
  margin: 0 auto 10px;
`;

export default function LandingPage() {
  const history = useHistory();
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    history.push('/gymworkout')
    console.log(res);
  };

  const onSubmit = () => {
    if (isSigningIn === false) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/gymworkout');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              setErrorMessage('Email is already in use');
              break;
            case 'auth/invalid-email':
              setErrorMessage('Invalid email');
              break;
            case 'auth/weak-password':
              setErrorMessage('Weak password');
              break;
            default:
          }
        });
    } else if (isSigningIn === true) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/gymworkout');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/user-not-found':
              setErrorMessage('Cannot find this user');
              break;
            case 'auth/invalid-email':
              setErrorMessage('Invalid email');
              break;
            case 'auth/wrong-password':
              setErrorMessage('Wrong password');
              break;
            default:
          }
        });
    }
  };

  return (
    <>
      <StyledBackGround src={HomePageBackground} />
      <StyledLogo src={Logo} />
      <StyledSlogan>COMMIT TO BE FIT <br/><br/> TOO UNIQUE TO QUIT</StyledSlogan>
      <StyledPopup
        trigger={<StyledLoginBtn>Join Now</StyledLoginBtn>}
        modal
        nested
      >
        {(close) => (
          <>
            <StyledPopupImage src={Fit} />
            <StyledContainer>
              {isSigningIn ? (
                <>
                  <StyledSignInTitle>Sign In</StyledSignInTitle>
                  <StyledInput
                    placeholder={'Email'}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <StyledInput
                    placeholder={'Password'}
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                  />
                  {errorMessage && (
                    <StyledMessage>{errorMessage}</StyledMessage>
                  )}
                  <StyledSignInBtn onClick={onSubmit}>Sign In</StyledSignInBtn>
                  <StyledSeparator>OR</StyledSeparator>
                  <StyledSignInMediaBtn
                    onClick={() => handleOnClick(facebookProvider)}
                  >
                    <StyledSignInImage src={Facebook} />
                    Facebook Sign In
                  </StyledSignInMediaBtn>
                  <StyledSignInMediaBtn
                    onClick={() => handleOnClick(googleProvider)}
                  >
                    <StyledSignInImage src={Google} />
                    Google Sign In
                  </StyledSignInMediaBtn>
                  <StyledCreateAccountBtn
                    onClick={() => {
                      setErrorMessage('');
                      setIsSigningIn(false);
                    }}
                  >
                    Create Account?
                  </StyledCreateAccountBtn>
                  <StyledCloseBtn
                    onClick={() => {
                      close();
                    }}
                  >
                    Close
                  </StyledCloseBtn>
                </>
              ) : (
                <>
                  <StyledSignInTitle>Sign Up</StyledSignInTitle>
                  <StyledInput
                    placeholder={'Email'}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <StyledInput
                    placeholder={'Password'}
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                  />
                  <StyledInput
                    placeholder={'User Name'}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errorMessage && (
                    <StyledMessage>{errorMessage}</StyledMessage>
                  )}
                  <StyledSignInBtn onClick={onSubmit}>Sign Up</StyledSignInBtn>
                  <StyledCreateAccountBtn
                    onClick={() => {
                      setErrorMessage('');
                      setIsSigningIn(true);
                    }}
                  >
                    Back To Sign In
                  </StyledCreateAccountBtn>
                  <StyledCloseBtn
                    onClick={() => {
                      close();
                    }}
                  >
                    Close
                  </StyledCloseBtn>
                </>
              )}
            </StyledContainer>
          </>
        )}
      </StyledPopup>
    </>
  );
}
