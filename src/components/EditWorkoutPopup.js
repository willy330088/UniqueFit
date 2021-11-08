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

export default function CreateWorkoutPage({ workout }) {
  const [title, setTitle] = useState(workout.title);
  const [description, setDescription] = useState(workout.description);
  const [targetMuscleGroup, setTargetMuscleGroup] = useState(
    workout.targetMuscleGroup
  );
  const [type, setType] = useState(workout.type);
  const [videoFile, setVideoFile] = useState('');
  const [source, setSource] = useState(workout.videoURL);
  const [paging, setPaging] = useState(1);

  function SaveWorkout() {
    const documentRef = firebase
      .firestore()
      .collection('workouts')
      .doc(workout.id);

    const fileRef = firebase.storage().ref('workout-videos/' + documentRef.id);
    const metadata = {
      contentType: videoFile.type,
    };

    if (videoFile === '') {
      documentRef
        .update({
          title: title,
          description: description,
          targetMuscleGroup: targetMuscleGroup,
          type: type,
        })
        .then(() => {
          alert('Updated Successfully!');
        });
    } else {
      fileRef
        .put(videoFile, metadata)
        .then(() => {
          fileRef.getDownloadURL().then((videoURL) => {
            documentRef.update({
              title: title,
              description: description,
              targetMuscleGroup: targetMuscleGroup,
              type: type,
              videoURL,
            });
          });
        })
        .then(() => {
          alert('Updated Successfully!');
        });
    }
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
          <StyledCreateWorkoutBtn onClick={SaveWorkout}>
            Save
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
