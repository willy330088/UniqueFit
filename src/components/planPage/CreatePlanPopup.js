import React, { useState } from 'react';
import DragandDrop from '../common/Drag&Drop';
import styled from 'styled-components';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import PlanDetailsInputP1 from '../common/PlanDetailsInputP1';
import PlanDetailsInputP2 from '../common/PlanDetailsInputP2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  noTitleError,
  noTargetMuscleGroupError,
  noDescriptionError,
  noEstimatedTrainingTimeError,
  noWorkoutsError,
  noWeightOrRepsError,
} from '../../utils/toast';
import { createPlan } from '../../utils/firebase';

const StyledArrowRightIcon = styled(AiOutlineRightCircle)`
  font-size: 40px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 30px;
  right: 40px;
  display: ${(props) => (props.paging === 3 ? 'none' : 'block')};

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
  display: ${(props) => (props.paging === 1 ? 'none' : 'block')};

  &:hover {
    color: #1face1;
  }
`;

const StyledCreateWorkoutBtn = styled.div`
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
    margin-top: 25px;
  }
`;

const StyledCreateLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
  width: 100%;
`;

export default function CreatePlanPopup({ paging, setPaging, close }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMuscleGroup, setTargetMuscleGroup] = useState('');
  const [estimatedTrainingTime, setEstimatedTrainingTime] = useState();
  const [createDisabled, setCreateDisabled] = useState(false);
  const [publicity, setPublicity] = useState(false);
  const [plan, setPlan] = useState({
    workoutSet: [],
  });

  async function onCreatePlan() {
    if (createDisabled) {
      return;
    } else {
      setCreateDisabled(true);
      let checked = false;

      if (title === '') {
        noTitleError();
        return;
      } else if (targetMuscleGroup === '') {
        noTargetMuscleGroupError();
        return;
      } else if (!estimatedTrainingTime) {
        noEstimatedTrainingTimeError();
        return;
      } else if (description === '') {
        noDescriptionError();
        return;
      } else if (plan.workoutSet.length === 0) {
        noWorkoutsError();
        return;
      }

      plan.workoutSet.every((workout) => {
        checked = false;
        if (!workout.reps || !workout.weight) {
          noWeightOrRepsError();
          return false;
        }
        checked = true;
        return true;
      });

      if (checked) {
        const planCreating = toast.loading('Creating Plan...', {
          position: toast.POSITION.TOP_CENTER,
        });

        await createPlan(
          title,
          publicity,
          description,
          targetMuscleGroup,
          estimatedTrainingTime,
          plan
        );
        toast.update(planCreating, {
          render: 'Created Successfully',
          type: 'success',
          isLoading: false,
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        close();
        setCreateDisabled(false);
      }
    }
  }

  function showMainContent() {
    if (paging === 1) {
      return (
        <PlanDetailsInputP1
          title={title}
          setTitle={setTitle}
          targetMuscleGroup={targetMuscleGroup}
          setTargetMuscleGroup={setTargetMuscleGroup}
          estimatedTrainingTime={estimatedTrainingTime}
          setEstimatedTrainingTime={setEstimatedTrainingTime}
        />
      );
    } else if (paging === 2) {
      return (
        <PlanDetailsInputP2
          description={description}
          setDescription={setDescription}
          publicity={publicity}
          setPublicity={setPublicity}
        />
      );
    } else {
      return (
        <>
          <StyledCreateLabel>Order Your Workouts</StyledCreateLabel>
          <DragandDrop plan={plan} setPlan={setPlan} />
          <StyledChangeWorkoutBtnContainer>
            <StyledCreateWorkoutBtn
              onClick={onCreatePlan}
              createDisabled={createDisabled}
            >
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
