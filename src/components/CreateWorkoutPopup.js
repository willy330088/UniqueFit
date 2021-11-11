import React, { useState } from 'react';
import styled from 'styled-components';
import WorkoutDetailsInput from './WorkoutDetailsInput';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import VideoInput from './VideoInput';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

const StyledCreateWorkoutBtn = styled.div`
  font-size: 20px;
  height: 40px;
  width: 120px;
  cursor: pointer;
  color: #1c2d9c;
  border-radius: 5px;
  background-color: white;
  text-align: center;
  line-height: 40px;
  margin: 10px 0;

  &:hover {
    color: white;
    background-color: #1c2d9c;
  }

  @media (min-width: 500px) {
    font-size: 35px;
    height: 50px;
    width: 200px;
    line-height: 50px;
  } 
`;

const StyledChangeWorkoutBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (min-width: 500px) {
    margin-top: 50px;
  } 
`;

const StyledArrowRightIcon = styled(AiOutlineRightCircle)`
  font-size: 40px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 30px;
  right: 40px;
  display: ${(props) => (props.paging === 1 ? 'block' : 'none')};

  &:hover {
    color: #1face1;
  }
`;

const StyledArrowLeftIcon = styled(AiOutlineLeftCircle)`
  font-size: 40px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 30px;
  left: 40px;
  display: ${(props) => (props.paging === 2 ? 'block' : 'none')};

  &:hover {
    color: #1face1;
  }
`;

export default function CreateWorkoutPage({close}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMuscleGroup, setTargetMuscleGroup] = useState('');
  const [type, setType] = useState('Gymworkout');
  const [videoFile, setVideoFile] = useState('');
  const [source, setSource] = useState();
  const [paging, setPaging] = useState(1);

  function createWorkout() {
    const documentRef = firebase.firestore().collection('workouts').doc();

    const fileRef = firebase.storage().ref('workout-videos/' + documentRef.id);
    const metadata = {
      contentType: videoFile.type,
    };
    fileRef
      .put(videoFile, metadata)
      .then(() => {
        fileRef.getDownloadURL().then((videoURL) => {
          documentRef.set({
            title: title,
            publisher: {
              displayName: firebase.auth().currentUser.displayName || '',
              photoURL: firebase.auth().currentUser.photoURL || '',
              uid: firebase.auth().currentUser.uid,
            },
            description: description,
            targetMuscleGroup: targetMuscleGroup,
            type: type,
            collectedBy: [],
            videoURL,
          });
        });
      })
      .then(() => {
        alert('Created Successfully!');
        close()
      });
  }

  function showMainContent() {
    if (paging === 1) {
      return (
        <WorkoutDetailsInput
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          setTargetMuscleGroup={setTargetMuscleGroup}
          targetMuscleGroup={targetMuscleGroup}
        />
      );
    } else {
      return (
        <>
          <VideoInput
            setType={setType}
            type={type}
            setVideoFile={setVideoFile}
            source={source}
            setSource={setSource}
          />
          <StyledChangeWorkoutBtnContainer>
            <StyledCreateWorkoutBtn onClick={createWorkout}>
              Create
            </StyledCreateWorkoutBtn>
          </StyledChangeWorkoutBtnContainer>
        </>
      );
    }
  }

  return (
    <>
      <StyledArrowRightIcon
        onClick={() => {
          setPaging(paging + 1);
        }}
        paging={paging}
      />
      <StyledArrowLeftIcon
        onClick={() => {
          setPaging(paging - 1);
        }}
        paging={paging}
      />
      {showMainContent()}
    </>
  );
}
