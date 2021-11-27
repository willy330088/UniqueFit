import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { useSelector } from 'react-redux';
import { BsCameraFill } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import {
  uploadUserPhoto,
  updateUserPhotoAndName,
  updateUserInfo,
  updateUserName,
} from '../../utils/firebase';
import { loadingToast, loadingCompletedToast } from '../../utils/toast';
import { StyledGeneralBtn } from '../common/GeneralStyle';

export default function EditProfilePopup({ closeModal, open }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [photoHover, setPhotoHover] = useState(false);
  const [personalHover, setPersonalHover] = useState(false);
  const inputPhotoRef = useRef();
  const [source, setSource] = useState(currentUser?.photoURL);
  const [userName, setUserName] = useState(currentUser?.displayName);
  const [photoFile, setPhotoFile] = useState();

  function handleFileChange(e) {
    const file = e.target.files[0];
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setSource(url);
  }

  function close() {
    closeModal();
    setSource(currentUser?.photoURL);
  }

  function handleChoose() {
    inputPhotoRef.current.click();
  }

  async function onSave() {
    const profileUpdatingToast = loadingToast('Updating Profile...');
    if (photoFile) {
      const metadata = { contentType: photoFile.type };
      const userPhotoURL = await uploadUserPhoto(
        photoFile,
        metadata,
        currentUser.uid
      );
      await updateUserPhotoAndName(userName, userPhotoURL);
      await updateUserInfo(userName, userPhotoURL);
      setPhotoFile(null);
      setSource(currentUser?.photoURL);
    } else {
      await updateUserName(userName);
      await updateUserInfo(userName, null);
    }
    loadingCompletedToast('Updated Successfully', profileUpdatingToast);
    closeModal();
  }

  return (
    <StyledPopup open={open} closeOnDocumentClick onClose={close}>
      <StyledPopupTitle>Edit Your Photo</StyledPopupTitle>
      <StyledPhotoContainer>
        {source || currentUser?.photoURL ? (
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
        ) : (
          <StyledPersonalIconContainer
            onClick={handleChoose}
            onMouseOver={() => {
              setPersonalHover(true);
            }}
            onMouseLeave={() => {
              setPersonalHover(false);
            }}
          >
            <StyledPersonalIcon hover={personalHover} />
            <StyledPhotoIconPersonal hover={personalHover} />
          </StyledPersonalIconContainer>
        )}
        <input
          style={{ display: 'none' }}
          ref={inputPhotoRef}
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
      </StyledPhotoContainer>
      <StyledPopupTitle>Edit Your Name</StyledPopupTitle>
      <StyledPopupInput
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <StyledPopupBtnContainer>
        <StyledPopupBtn onClick={onSave}>Save</StyledPopupBtn>
      </StyledPopupBtnContainer>
    </StyledPopup>
  );
}

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    background: #222d35;
    width: 400px;
    height: 450px;
    border-radius: 10px;
    padding: 20px 50px;
  }
`;

const StyledPhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const StyledPhoto = styled.div`
  width: 120px;
  height: 120px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  font-size: 30px;
  color: #1face1;
  width: 100%;
  padding-bottom: 10px;
  margin: 0 0 10px 0;
  border-bottom: 3px #1face1 solid;
`;

const StyledPopupInput = styled.input`
  width: 100%;
  height: 50px;
  outline: none;
  font-size: 30px;
  margin-bottom: 30px;
  background: #222d35;
  border: none;
  color: white;
  border-radius: 5px;

  &:focus {
    background: hsla(196, 76%, 80%);
    color: black;
    padding-left: 10px;
  }
`;

const StyledPopupBtn = styled(StyledGeneralBtn)`
  font-size: 25px;
  height: 40px;
  width: 120px;
  line-height: 40px;
  margin: 10px 0;
`;

const StyledPopupBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const StyledPersonalIcon = styled(HiUserCircle)`
  font-size: 120px;
  color: ${(props) => (props.hover ? 'grey' : 'white')};
  cursor: pointer;
  filter: ${(props) => (props.hover ? 'blur(3px)' : 'none')};
`;

const StyledPersonalIconContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledPhotoIconPersonal = styled(BsCameraFill)`
  position: absolute;
  color: white;
  font-size: 40px;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  display: ${(props) => (props.hover ? 'block' : 'none')};
  z-index: 100;
  cursor: pointer;
`;
