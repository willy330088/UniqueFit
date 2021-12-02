import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';

import DragandDrop from './PlanOrderInput';
import PlanDetailsInputP1 from './PlanDetailsInputP1';
import PlanDetailsInputP2 from './PlanDetailsInputP2';
import { StyledSubmitWorkoutAndPlanBtn } from './GeneralStyle';
import {
  errorToast,
  loadingToast,
  loadingCompletedToast,
} from '../../utils/toast';
import { createPlan, editPlan } from '../../utils/firebase';
import useWindowWidth from '../../utils/getWindowWidth';

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
  const { width } = useWindowWidth();

  async function onSubmitPlan() {
    if (submitDisabled) {
      return;
    } else {
      setSubmitDisabled(true);
      let checked = false;

      if (title === '') {
        errorToast('Please fill in title');
        return;
      } else if (targetMuscleGroup === '') {
        errorToast('Please choose target muscle group');
        return;
      } else if (!estimatedTrainingTime) {
        errorToast('Please fill in estimated training time');
        return;
      } else if (description === '') {
        errorToast('Please fill in description');
        return;
      } else if (plan.workoutSet.length === 0) {
        errorToast('Please add workouts');
        return;
      }

      plan.workoutSet.every((workout) => {
        checked = false;
        if (!workout.reps || !workout.weight) {
          errorToast('Please fill in weights and reps');
          return false;
        }
        checked = true;
        return true;
      });

      if (checked) {
        if (type === 'Create') {
          const planCreating = loadingToast('Creating Plan...');
          await createPlan(
            title,
            publicity,
            description,
            targetMuscleGroup,
            estimatedTrainingTime,
            plan
          );
          loadingCompletedToast('Created Successfully', planCreating);
        } else {
          const planEditing = loadingToast('Editing Plan...');
          await editPlan(
            title,
            publicity,
            description,
            targetMuscleGroup,
            estimatedTrainingTime,
            plan,
            originalPlan.id
          );
          loadingCompletedToast('Edited Successfully', planEditing);
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
          {width >= 1100 ? (
            <>
              <DragandDrop plan={plan} setPlan={setPlan} />
              <StyledChangeWorkoutBtnContainer>
                <StyledSubmitWorkoutAndPlanBtn
                  onClick={onSubmitPlan}
                  submitDisabled={submitDisabled}
                >
                  {type === 'Create' ? 'Create' : 'Save'}
                </StyledSubmitWorkoutAndPlanBtn>
              </StyledChangeWorkoutBtnContainer>
            </>
          ) : (
            <StyledReminder>
              Please create / edit plans on desktop
            </StyledReminder>
          )}
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

const StyledReminder = styled.div`
  color: #1face1;
  font-size: 30px;
  text-align: center;
  width: 100%;
  margin-top: 200px;

  @media (min-width: 500px) {
    margin-top: 250px;
  }
`;
