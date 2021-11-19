import React, { useState } from 'react';
import styled from 'styled-components';
import WorkoutDetailsInput from './WorkoutDetailsInput';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoInput from './VideoInput';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

const StyledCreateWorkoutBtn = styled.div`
  font-size: 20px;
  height: 40px;
  width: 120px;
  cursor: ${(props) => (props.createDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.createDisabled ? '#d1d1d1' : '#1face1')};
  border-radius: 5px;
  background-color: ${(props) => (props.createDisabled ? '#969696' : 'transparent')};
  text-align: center;
  line-height: 40px;
  margin: 10px 0;
  border: ${(props) => (props.createDisabled ? 'none' : '2px solid #1face1')};

  &:hover {
    color: ${(props) => (props.createDisabled ? '#d1d1d1' : 'white')};
    background-color: ${(props) => (props.createDisabled ? '#969696' : '#1face1')};
  }

  @media (min-width: 500px) {
    font-size: 35px;
    height: 50px;
    width: 200px;
    line-height: 46px;
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

export default function CreateWorkoutPage({ workout, close }) {
  const [title, setTitle] = useState(workout.title);
  const [description, setDescription] = useState(workout.description);
  const [targetMuscleGroup, setTargetMuscleGroup] = useState(
    workout.targetMuscleGroup
  );
  const [type, setType] = useState(workout.type);
  const [videoFile, setVideoFile] = useState('');
  const [source, setSource] = useState(workout.videoURL);
  const [paging, setPaging] = useState(1);
  const [createDisabled, setCreateDisabled] = useState(false);

  function SaveWorkout() {
    if (createDisabled) {
      return
    } else {
      setCreateDisabled(true)
      const documentRef = firebase
        .firestore()
        .collection('workouts')
        .doc(workout.id);

      const fileRef = firebase.storage().ref('workout-videos/' + documentRef.id);
      const metadata = {
        contentType: videoFile.type,
      };

      if (title === '') {
        toast.error('Please fill in title', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return
      } else if (description === '') {
        toast.error('Please fill in description', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return
      }

      const workoutEditing = toast.loading('Editing Workouts...', {
        position: toast.POSITION.TOP_CENTER,
      });

      if (videoFile === '') {
        documentRef
          .update({
            title: title,
            description: description,
            targetMuscleGroup: targetMuscleGroup,
            type: type,
          })
          .then(() => {
            toast.update(workoutEditing, {
              render: 'Edited Successfully',
              type: 'success',
              isLoading: false,
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            })
            close();
            setCreateDisabled(false)
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
            toast.update(workoutEditing, {
              render: 'Edited Successfully',
              type: 'success',
              isLoading: false,
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            })
            close();
            setCreateDisabled(false)
          });
      }
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
          <StyledChangeWorkoutBtnContainer>
            <StyledCreateWorkoutBtn onClick={SaveWorkout} createDisabled={createDisabled}>
              Save
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
