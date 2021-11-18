import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { useSelector } from 'react-redux';
import { BsCameraFill } from 'react-icons/bs';

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    background: #222d35;
    width: 400px;
    height: 400px;
    border-radius: 10px;
    padding: 20px 50px;
  }
`;

const StyledPhotoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPhoto = styled.div`
  width: 120px;
  height: 120px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: ease-in-out 0.2s;
    border-radius: 50%;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    &::after {
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
    }
  }
`;

const StyledPhotoIcon = styled(BsCameraFill)`
  position: absolute;
  color: white;
  font-size: 40px;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  display: ${(props) => (props.hover ? 'block' : 'none')};
  z-index: 100;
`;

const StyledPopupTitle = styled.div`
  font-size: 40px;
  color: white;
  text-align: center;
  width: 100%;
  padding-bottom: 15px;
  margin: 20px 0px;
  border-bottom: 3px white solid;
`;

const StyledPopupInput = styled.input`
  width: 100%;
  height: 50px;
  outline: none;
  font-size: 30px;
  margin-bottom: 30px;
`;

const StyledPopupBtn = styled.button`
  width: 100px;
  height: 40px;
  font-size: 30px;
  margin-left: calc(50% - 50px);
  cursor: pointer;
`;

export default function EditProfilePopup({ closeModal, open }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [photoHover, setPhotoHover] = useState(false);
  const [source, setSource] = useState(currentUser.photoURL)
  const [photoFile, setPhotoFile] = useState()
  const inputPhotoRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = () => {
    inputPhotoRef.current.click();
  };

  return (
    <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
      <StyledPhotoContainer>
        <StyledPhoto
          src={source}
          onMouseOver={() => {
            setPhotoHover(true);
          }}
          onMouseLeave={() => {
            setPhotoHover(false);
          }}
          onClick={handleChoose}
        >
          <StyledPhotoIcon hover={photoHover} />
        </StyledPhoto>
        <input
          style={{ display: 'none' }}
          ref={inputPhotoRef}
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
      </StyledPhotoContainer>
      <StyledPopupTitle>Edit Your Name</StyledPopupTitle>
      <StyledPopupInput />
      <StyledPopupBtn>Save</StyledPopupBtn>
    </StyledPopup>
  );
}
