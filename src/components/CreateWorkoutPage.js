import React, { useState } from 'react';
import Header from './Header';
import Banner from './Banner';
import styled from 'styled-components';
import WorkoutDetailsInput from './WorkoutDetailsInput';
import VideoInput from './VideoInput';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledContainer = styled.div`
  padding: 30px 100px 50px;
  @media (min-width: 850px) {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledCreateWorkoutBtn = styled.button`
  width: 200px;
  font-size: 30px;
  margin-left: calc(50% - 100px);
  margin-bottom: 100px;
  cursor: pointer;
`;

export default function CreateWorkoutPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMuscleGroup, setTargetMuscleGroup] = useState('');
  const [type, setType] = useState('gymworkout');
  const [videoFile, setVideoFile] = useState('')

  function createWorkout() {
    let documentRef
    if (type === 'gymworkout') {
      documentRef = firebase.firestore().collection('gym-workouts').doc();
    } else {
      documentRef = firebase.firestore().collection('home-workouts').doc();
    }

    const fileRef = firebase.storage().ref('workout-videos/' + documentRef.id)
    const metadata = {
      contentType: videoFile.type
    }
    fileRef.put(videoFile, metadata).then(() => {
      fileRef.getDownloadURL().then((videoURL) => {
        documentRef.set({
          title: title,
          publisher: {
            displayName: firebase.auth().currentUser.displayName || '',
            photoURL: firebase.auth().currentUser.photoURL || '',
            uid: firebase.auth().currentUser.uid
          },
          description: description,
          targetMuscleGroup: targetMuscleGroup,
          collectedBy: [],
          comments: [],
          videoURL
        })
      })
    })
  }

  return (
    <StyledBody>
      <Header />
      <Banner />
      <StyledContainer>
        <WorkoutDetailsInput
          setTitle={setTitle}
          setDescription={setDescription}
          setTargetMuscleGroup={setTargetMuscleGroup}
          targetMuscleGroup={targetMuscleGroup}
        />
        <VideoInput setType={setType} type={type} setVideoFile={setVideoFile}/>
      </StyledContainer>
      <StyledCreateWorkoutBtn onClick={createWorkout}>Create</StyledCreateWorkoutBtn>
    </StyledBody>
  );
}
