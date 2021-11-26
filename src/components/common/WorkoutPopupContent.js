import React, { useState } from 'react';
import styled from 'styled-components';
import WorkoutDetailsInput from '../common/WorkoutDetailsInput';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import VideoInput from '../common/VideoInput';
import { createWorkout, editWorkout } from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import {
  errorToast,
  loadingToast,
  loadingCompletedToast,
} from '../../utils/toast';

export default function WorkoutPopupContent({
  changeType,
  paging,
  setPaging,
  title,
  setTitle,
  targetMuscleGroup,
  setTargetMuscleGroup,
  description,
  setDescription,
  type,
  setType,
  videoFile,
  setVideoFile,
  source,
  setSource,
  close,
  workoutId,
}) {
  const [submitDisabled, setSubmitDisabled] = useState(false);

  async function onSubmitWorkout() {
    if (submitDisabled) {
      return;
    } else {
      setSubmitDisabled(true);
      if (title === '') {
        errorToast('Please fill in title');
        return;
      } else if (targetMuscleGroup === '') {
        errorToast('Please choose target muscle group');
        return;
      } else if (description === '') {
        errorToast('Please fill in description');
        return;
      } else if (changeType === 'Create' && videoFile === '') {
        errorToast('Please upload video');
        return;
      }

      const metadata = {
        contentType: videoFile.type,
      };

      if (changeType === 'Create') {
        const workoutCreating = loadingToast('Creating Workout...');
        await createWorkout(
          videoFile,
          metadata,
          title,
          description,
          targetMuscleGroup,
          type
        );
        loadingCompletedToast('Created Successfully', workoutCreating);
      } else {
        const workoutEditing = loadingToast('Editing Workout...');
        await editWorkout(
          videoFile,
          metadata,
          title,
          description,
          targetMuscleGroup,
          type,
          workoutId
        );
        loadingCompletedToast('Edited Successfully', workoutEditing);
      }
      close();
      setSubmitDisabled(false);
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
            <StyledSubmitWorkoutBtn
              onClick={onSubmitWorkout}
              createDisabled={submitDisabled}
            >
              {changeType === 'Create' ? 'Create' : 'Save'}
            </StyledSubmitWorkoutBtn>
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

const StyledSubmitWorkoutBtn = styled.div`
  font-size: 20px;
  height: 40px;
  width: 120px;
  cursor: ${(props) => (props.createDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.createDisabled ? '#d1d1d1' : '#1face1')};
  border-radius: 5px;
  background-color: ${(props) =>
    props.createDisabled ? '#969696' : 'transparent'};
  text-align: center;
  line-height: 40px;
  margin: 10px 0;
  border: ${(props) => (props.createDisabled ? 'none' : '2px solid #1face1')};

  &:hover {
    color: ${(props) => (props.createDisabled ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.createDisabled ? '#969696' : '#1face1'};
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
