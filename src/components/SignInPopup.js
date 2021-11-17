import React, { useState } from 'react';
import Fit from '../images/fit.jpeg';
import styled, { keyframes } from 'styled-components';
import Popup from 'reactjs-popup';
import firebase from '../utils/firebase';
import 'firebase/auth';
import { facebookProvider, googleProvider } from '../utils/authMethod';
import socialMediaAuth from '../utils/auth';
import { useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

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

export default function SignInPopup({closeModal}) {
  const history = useHistory();
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    history.push('/home');
    console.log(res);
  };

  const onSubmit = () => {
    if (isSigningIn === false) {
      if (name === '') {
        setErrorMessage('Please fill in username');
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: name,
          });
        })
        .then(() => {
          history.push('/home');
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
          history.push('/home');
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
              onClick={() => handleOnClick(facebookProvider)}
            >
              <StyledFacebookIcon />
              <StyledSignInMediaText>
                Facebook Sign In
              </StyledSignInMediaText>
            </StyledSignInMediaBtn>
            <StyledSignInMediaBtn
              onClick={() => handleOnClick(googleProvider)}
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
    </>
  )
}
