import React, { useState } from 'react';

import styled, { keyframes } from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

import {
  firebase,
  facebookProvider,
  googleProvider,
  socialMediaAuth,
  setSocialMediaUserData,
} from '../utils/firebase';
import { signInToast } from '../utils/toast';
import 'firebase/auth';
import Fit from '../images/fit.jpeg';

export default function SignInPopup({ open, closeModal }) {
  const history = useHistory();
  const location = useLocation();
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userRef = firebase.firestore().collection('users');

  function signInComplete() {
    if (location.pathname === '/') {
      history.push('/home');
    } else {
      closeModal();
    }
    signInToast();
  }

  async function socialMediaSignIn(provider) {
    const userData = await socialMediaAuth(provider);
    await setSocialMediaUserData(userData);
    signInComplete();
  }

  function onSubmit() {
    if (isSigningIn === false) {
      if (name === '') {
        setErrorMessage('Please fill in username');
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          firebase.auth().currentUser.updateProfile({
            displayName: name,
          });
          userRef
            .doc(res.user.uid)
            .set({
              displayName: name,
              photoURL: null,
            })
            .then(() => {
              if (location.pathname === '/') {
                history.push('/home');
              } else {
                closeModal();
              }
              signInToast();
            });
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
          if (location.pathname === '/') {
            history.push('/home');
          } else {
            closeModal();
          }
          signInToast();
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
  }

  return (
    <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
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
            {errorMessage && <StyledMessage>{errorMessage}</StyledMessage>}
            <StyledSignInBtn onClick={onSubmit}>Sign In</StyledSignInBtn>
            <StyledSeparator>OR</StyledSeparator>
            <StyledSignInMediaBtn
              onClick={() => socialMediaSignIn(facebookProvider)}
            >
              <StyledFacebookIcon />
              <StyledSignInMediaText>Facebook Sign In</StyledSignInMediaText>
            </StyledSignInMediaBtn>
            <StyledSignInMediaBtn
              onClick={() => socialMediaSignIn(googleProvider)}
            >
              <StyledGoogleIcon />
              <StyledSignInMediaText>Google Sign In</StyledSignInMediaText>
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
                closeModal();
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
            {errorMessage && <StyledMessage>{errorMessage}</StyledMessage>}
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
                closeModal();
              }}
            >
              Close
            </StyledCloseBtn>
          </>
        )}
      </StyledContainer>
    </StyledPopup>
  );
}

const StyledPopupImage = styled.img`
  height: 100%;
  width: 40%;
  object-fit: cover;
  display: none;

  @media (min-width: 500px) {
    display: block;
  }
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
  border: 2px solid #c9c9c9;
  padding-left: 5px;
  border-radius: 5px;
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
    left: 200px;
    height: 1px;
  }

  ::after {
    position: absolute;
    content: '';
    background-color: grey;
    top: 50%;
    left: 20px;
    right: 200px;
    height: 1px;
  }

  @media (min-width: 500px) {
    ::before {
      left: 180px;
    }

    ::after {
      right: 180px;
    }
  }

  @media (min-width: 700px) {
    ::before {
      left: 270px;
    }

    ::after {
      right: 270px;
    }
  }
`;

const StyledSignInBtn = styled.button`
  width: 55%;
  margin: 0 auto 25px;
  height: 40px;
  font-size: 20px;
  background-color: #0c1863;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: hsla(232, 59%, 42%);
  }
`;

const StyledSignInMediaBtn = styled.div`
  width: 65%;
  margin: 0 auto 25px;
  height: 40px;
  background-color: #0c1863;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  &:hover {
    background-color: hsla(232, 59%, 42%);
  }
`;

const StyledGoogleIcon = styled(FcGoogle)`
  font-size: 20px;
  margin-right: 10px;
`;

const StyledFacebookIcon = styled(BsFacebook)`
  font-size: 20px;
  color: #1778f2;
  margin-right: 10px;
`;

const StyledSignInMediaText = styled.div`
  color: white;
  font-size: 18px;
`;

const StyledCloseBtn = styled.button`
  background-color: transparent;
  color: #0c1863;
  cursor: pointer;
  border: none;
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 18px;
`;

const StyledCreateAccountBtn = styled.button`
  background-color: transparent;
  color: #0c1863;
  cursor: pointer;
  border: none;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledMessage = styled.div`
  color: red;
  font-weight: bold;
  margin: 0 auto 10px;
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
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 350px;
    display: flex;
    height: 550px;
    animation: ${anvil} 0.6s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;

    @media (min-width: 500px) {
      width: 500px;
    }

    @media (min-width: 700px) {
      width: 700px;
    }
  }
`;
