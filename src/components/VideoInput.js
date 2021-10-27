import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Upload from '../images/upload.png';

const StyledVideoInput = styled.div`
  width: 100%;
  @media (min-width: 850px) {
    width: 45%;
  }
`;

const StyledCreateLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
`;

const StyledUploadArea = styled.div`
  background: #ededed;
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`;

const StyledUploadIcon = styled.img`
  width: 100px;
  position: relative;
  top: 120px;
  left: calc(50% - 50px);
  cursor: pointer;
`;

const StyledUploadVideo = styled.video`
  width: 100%;
`;

const StyledChangeVideoBtn = styled.button`
  font-size: 25px;
  height: 50px;
  width: 200px;
  margin-bottom: 20px;
`;

const StyledTypeInput = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const StyledTypeLabel = styled.label`
  color: white;
  font-size: 25px;
  margin-right: 10px;
`;

export default function VideoInput({ setType, type, setVideoFile}) {
  const inputRef = useRef();
  const [source, setSource] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file)
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = () => {
    inputRef.current.click();
  };

  return (
    <StyledVideoInput>
      <StyledCreateLabel>Video</StyledCreateLabel>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {source ? (
        <>
          <StyledUploadVideo controls src={source} />
          <StyledChangeVideoBtn onClick={handleChoose}>
            Change Video
          </StyledChangeVideoBtn>
        </>
      ) : (
        <StyledUploadArea>
          <StyledUploadIcon src={Upload} onClick={handleChoose} />
        </StyledUploadArea>
      )}
      <StyledCreateLabel>Type</StyledCreateLabel>
      <StyledTypeInput
        type={'radio'}
        name={'workoutType'}
        value={'gymworkout'}
        checked={type === 'gymworkout'}
        onClick={() => {
          if (type !== 'gymworkout') {
            setType('gymworkout')
          }
        }}
      />
      <StyledTypeLabel>Gym Workout</StyledTypeLabel>
      <StyledTypeInput
        type={'radio'}
        name={'workoutType'}
        value={'homeworkout'}
        checked={type === 'homeworkout'}
        onClick={() => {
          if (type !== 'homeworkout') {
            setType('homeworkout')
          }
        }}
      />
      <StyledTypeLabel>Home Workout</StyledTypeLabel>
    </StyledVideoInput>
  );
}
