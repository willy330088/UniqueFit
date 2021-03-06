import React, { useState } from 'react';
import styled from 'styled-components';
import { ImPlay } from 'react-icons/im';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';

import usePopup from '../../hooks/usePopup';
import WorkoutPopup from '../Common/WorkoutPopup';
import { StyledVerticalContainer } from '../Common/GeneralStyle';

export default function SpecificPlanWorkoutItem({
  workout,
  index,
  workoutSetDetails,
  muscleGroups,
  completeNum,
  setCompleteNum,
  trainingMode,
  setSignInOpen,
}) {
  const [checked, setChecked] = useState(false);
  const [open, setOpen, close] = usePopup();

  function toggleChecked() {
    if (checked === true) {
      setCompleteNum(completeNum - 1);
    } else {
      setCompleteNum(completeNum + 1);
    }
    setChecked(!checked);
  }

  return (
    <StyledPlanWorkoutItemContainer>
      <StyledVerticalContainer>
        <StyledPlanWorkoutImage
          src={
            workoutSetDetails[index]
              ? muscleGroups.filter(
                  (muscleGroup) =>
                    muscleGroup.name ===
                    workoutSetDetails[index].targetMuscleGroup
                )[0].src
              : null
          }
        />
        <StyledPlanWorkoutName>{workout.title}</StyledPlanWorkoutName>
      </StyledVerticalContainer>
      <StyledPlanWorkoutItemDetailContainer>
        <StyledPlanWorkoutItemWeightContainer>
          <StyledPlanWorkoutItemWeightIcon />
          <StyledPlanWorkoutItemWeightNum>
            {workout.weight}kg
          </StyledPlanWorkoutItemWeightNum>
        </StyledPlanWorkoutItemWeightContainer>
        <StyledPlanWorkoutItemDumbbellContainer>
          <StyledPlanWorkoutItemDumbbellIcon />
          <StyledPlanWorkoutItemDumbbellNum>
            {workout.reps}reps
          </StyledPlanWorkoutItemDumbbellNum>
        </StyledPlanWorkoutItemDumbbellContainer>
      </StyledPlanWorkoutItemDetailContainer>
      <StyledPlanPlayIcon
        onClick={() => {
          setOpen(true);
        }}
      />
      <WorkoutPopup
        workout={workoutSetDetails[index]}
        close={close}
        open={open}
        setSignInOpen={setSignInOpen}
      />
      {trainingMode ? (
        <StyledCheckbox
          type="checkbox"
          checked={checked}
          onClick={toggleChecked}
        />
      ) : null}
    </StyledPlanWorkoutItemContainer>
  );
}

const StyledPlanWorkoutItemContainer = styled.div`
  background: #e3e3e3;
  padding: 10px 20px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  @media (min-width: 850px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledPlanWorkoutName = styled.div`
  font-size: 30px;
  color: #1face1;

  @media (min-width: 550px) {
    margin-left: 15px;
  }
`;

const StyledPlanWorkoutImage = styled.img`
  width: 55px;
  display: none;

  @media (min-width: 550px) {
    display: block;
  }
`;

const StyledPlanWorkoutItemDetailContainer = styled(StyledVerticalContainer)`
  margin-top: 10px;

  @media (min-width: 850px) {
    margin-top: 0px;
  }
`;

const StyledPlanWorkoutItemWeightContainer = styled.div`
  width: 80px;
  display: flex;
`;

const StyledPlanWorkoutItemDumbbellContainer = styled.div`
  width: 100px;
  display: flex;
  margin-right: 80px;
`;

const StyledPlanWorkoutItemWeightIcon = styled(FaWeightHanging)`
  color: #222d35;
  font-size: 20px;
`;

const StyledPlanWorkoutItemWeightNum = styled.div`
  color: #222d35;
  font-size: 20px;
  margin-left: 5px;
`;

const StyledPlanWorkoutItemDumbbellIcon = styled(FaDumbbell)`
  color: #222d35;
  font-size: 23px;
`;

const StyledPlanWorkoutItemDumbbellNum = styled.div`
  color: #222d35;
  font-size: 20px;
  margin-left: 5px;
`;

const StyledPlanPlayIcon = styled(ImPlay)`
  color: #222d35;
  font-size: 40px;
  margin-right: 40px;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: calc(50% - 20px);

  &:hover {
    color: #1face1;
  }
`;

const StyledCheckbox = styled.input`
  width: 17px;
  height: 17px;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: calc(50% - 8.5px);
`;
