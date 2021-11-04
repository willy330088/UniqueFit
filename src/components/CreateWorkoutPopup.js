import React, { useState } from 'react';
import styled from 'styled-components';
import WorkoutDetailsInput from './WorkoutDetailsInput';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import VideoInput from './VideoInput';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

const StyledCreateWorkoutBtn = styled.button`
  width: 200px;
  font-size: 30px;
  margin-left: calc(50% - 100px);
  margin-bottom: 100px;
  margin-top: 50px;
  cursor: pointer;
`;

const StyledArrowRightIcon = styled(AiOutlineRightCircle)`
  font-size: 40px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 30px;
  right: 40px;
  display: ${(props) => (props.paging === 1 ? 'block' : 'none')};
`;

const StyledArrowLeftIcon = styled(AiOutlineLeftCircle)`
  font-size: 40px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 30px;
  left: 40px;
  display: ${(props) => (props.paging === 2 ? 'block' : 'none')};
`;

export default function CreateWorkoutPage() {
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
          <StyledCreateWorkoutBtn onClick={createWorkout}>
            Create
          </StyledCreateWorkoutBtn>
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
