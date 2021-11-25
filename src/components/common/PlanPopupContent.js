import React, { useState } from 'react';
import DragandDrop from './Drag&Drop';
import styled from 'styled-components';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import PlanDetailsInputP1 from './PlanDetailsInputP1';
import PlanDetailsInputP2 from './PlanDetailsInputP2';
import {
  noTitleError,
  noTargetMuscleGroupError,
  noDescriptionError,
  noEstimatedTrainingTimeError,
  noWorkoutsError,
  noWeightOrRepsError,
  planManaging,
  planComplete,
} from '../../utils/toast';
import { createPlan, editPlan } from '../../utils/firebase';

export default function PlanPopupContent({
  type,
  paging,
  setPaging,
  title,
  setTitle,
  targetMuscleGroup,
  setTargetMuscleGroup,
  estimatedTrainingTime,
  setEstimatedTrainingTime,
  description,
  setDescription,
  publicity,
  setPublicity,
  plan,
  setPlan,
  close,
  originalPlan,
}) {
  const [submitDisabled, setSubmitDisabled] = useState(false);

  async function onSubmitPlan() {
    if (submitDisabled) {
      return;
    } else {
      setSubmitDisabled(true);
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
        if (type === 'Create') {
          const planCreating = planManaging('Create');
          await createPlan(
            title,
            publicity,
            description,
            targetMuscleGroup,
            estimatedTrainingTime,
            plan
          );
          planComplete('Create', planCreating);
        } else {
          const planEditing = planManaging('Edit');
          await editPlan(
            title,
            publicity,
            description,
            targetMuscleGroup,
            estimatedTrainingTime,
            plan,
            originalPlan.id
          );
          planComplete('Edit', planEditing);
        }

        close();
        setSubmitDisabled(false);
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
            <StyledSubmitPlanBtn
              onClick={onSubmitPlan}
              submitDisabled={submitDisabled}
            >
              {type === 'Create' ? 'Create' : 'Save'}
            </StyledSubmitPlanBtn>
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

const StyledSubmitPlanBtn = styled.div`
  font-size: 20px;
  height: 40px;
  width: 120px;
  cursor: ${(props) => (props.submitDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.submitDisabled ? '#d1d1d1' : '#1face1')};
  border-radius: 5px;
  background-color: ${(props) =>
    props.submitDisabled ? '#969696' : 'transparent'};
  text-align: center;
  line-height: 40px;
  margin: 10px 0;
  border: ${(props) => (props.submitDisabled ? 'none' : '2px solid #1face1')};

  &:hover {
    color: ${(props) => (props.submitDisabled ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.submitDisabled ? '#969696' : '#1face1'};
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
