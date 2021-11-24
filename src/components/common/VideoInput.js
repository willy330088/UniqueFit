import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Upload from '../../images/upload.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledVideoInput = styled.div`
  width: 100%;
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
  height: 120px;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 500px) {
    width: 80%;
    height: 250px;
    margin: auto;
    margin-bottom: 20px;
  }
`;

const StyledUploadIcon = styled.img`
  width: 70px;
  transition: ease-in-out 0.3s;

  @media (min-width: 500px) {
    width: ${(props) => (props.hover ? '200px' : '150px')};
  }
`;

const StyledUploadVideo = styled.video`
  width: 100%;
  border-radius: 10px;

  @media (min-width: 500px) {
    width: 80%;
    height: 250px;
    margin: auto;
  }
`;

const StyledUploadVideoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledChangeVideoBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledChangeVideoBtn = styled.div`
  font-size: 20px;
  height: 30px;
  width: 150px;
  cursor: pointer;
  color: #1face1;
  border-radius: 5px;
  background-color: transparent;
  text-align: center;
  line-height: 26px;
  margin: 10px 0;
  border: 2px solid #1face1;

  &:hover {
    color: white;
    background-color: #1face1;
  }
`;

const StyledTypeInput = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const StyledTypeLabel = styled.label`
  color: white;
  font-size: 25px;
  margin-right: 10px;
`;

export default function VideoInput({
  source,
  setSource,
  setType,
  type,
  setVideoFile,
}) {
  const inputRef = useRef();
  const [hover, setHover] = useState(false);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file.size);
      if (file.size > 10000000) {
        toast.error('Video Size Limit: 10 MB', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      } else {
        setVideoFile(file);
        const url = URL.createObjectURL(file);
        setSource(url);
      }
    }
  };

  const handleChoose = () => {
    inputRef.current.value = null;
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
          <StyledUploadVideoContainer>
            <StyledUploadVideo controls src={source} />
          </StyledUploadVideoContainer>
          <StyledChangeVideoBtnContainer>
            <StyledChangeVideoBtn onClick={handleChoose}>
              Change Video
            </StyledChangeVideoBtn>
          </StyledChangeVideoBtnContainer>
        </>
      ) : (
        <StyledUploadArea onClick={handleChoose}>
          <StyledUploadIcon
            src={Upload}
            hover={hover}
            onMouseOver={() => {
              setHover(!hover);
            }}
            onMouseLeave={() => {
              setHover(!hover);
            }}
          />
        </StyledUploadArea>
      )}
      <StyledCreateLabel>Type</StyledCreateLabel>
      <StyledTypeInput
        type={'radio'}
        name={'workoutType'}
        value={'Gymworkout'}
        checked={type === 'Gymworkout'}
        readOnly
        onClick={() => {
          if (type !== 'Gymworkout') {
            setType('Gymworkout');
          }
        }}
      />
      <StyledTypeLabel>Gym Workout</StyledTypeLabel>
      <StyledTypeInput
        type={'radio'}
        name={'workoutType'}
        value={'Homeworkout'}
        checked={type === 'Homeworkout'}
        readOnly
        onClick={() => {
          if (type !== 'Homeworkout') {
            setType('Homeworkout');
          }
        }}
      />
      <StyledTypeLabel>Home Workout</StyledTypeLabel>
    </StyledVideoInput>
  );
}
