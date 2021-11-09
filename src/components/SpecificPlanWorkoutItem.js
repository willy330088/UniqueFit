import React, { useState } from 'react';
import WorkoutPopup from './WorkoutPopup';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { ImPlay } from 'react-icons/im';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';

const StyledPlanWorkoutItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e3e3e3;
  height: 70px;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

const StyledPlanWorkoutItemTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanWorkoutName = styled.div`
  font-size: 30px;
  color: #1face1;
  margin-left: 15px;
`;

const StyledPlanWorkoutImage = styled.img`
  width: 40px;
`;

const StyledPlanWorkoutItemDetailContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanWorkoutItemWeightIcon = styled(FaWeightHanging)`
  color: #222d35;
  font-size: 20px;
  margin-left: 10px;
`;

const StyledPlanWorkoutItemWeightNum = styled.div`
  color: #222d35;
  font-size: 20px;
  margin-left: 5px;
`;

const StyledPlanWorkoutItemDumbbellIcon = styled(FaDumbbell)`
  color: #222d35;
  font-size: 22px;
  margin-left: 10px;
`;

const StyledPlanWorkoutItemDumbbellNum = styled.div`
  color: #222d35;
  font-size: 20px;
  margin-left: 5px;
`;

const StyledPlanPlayIcon = styled(ImPlay)`
  color: #222d35;
  font-size: 40px;
  margin-right: 20px;
  cursor: pointer;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 700px;
    height: 550px;
    overflow-y: scroll;
  }
`;

export default function SpecificPlanWorkoutItem({
  workout,
  index,
  workoutSetDetails,
  muscleGroups,
  completeNum,
  setCompleteNum
}) {

  const [checked, setChecked] = useState(false)

  function toggleChecked() {
    if (checked === true) {
      setCompleteNum(completeNum - 1)
    } else {
      setCompleteNum(completeNum + 1)
    }
    setChecked(!checked)
  }

  return (
    <StyledPlanWorkoutItemContainer>
      <StyledPlanWorkoutItemTitleContainer>
        <StyledPlanWorkoutImage
          src={
            workoutSetDetails[index]
              ? muscleGroups.filter((muscleGroup) => {
                  if (
                    muscleGroup.name ===
                    workoutSetDetails[index].targetMuscleGroup
                  )
                    return muscleGroup;
                })[0].src
              : null
          }
        />
        <StyledPlanWorkoutName>{workout.title}</StyledPlanWorkoutName>
      </StyledPlanWorkoutItemTitleContainer>
      <StyledPlanWorkoutItemDetailContainer>
        <StyledPopup trigger={<StyledPlanPlayIcon />} modal nested>
          <WorkoutPopup workout={workoutSetDetails[index]} />
        </StyledPopup>
        <StyledPlanWorkoutItemWeightIcon />
        <StyledPlanWorkoutItemWeightNum>
          {workout.weight}kg
        </StyledPlanWorkoutItemWeightNum>
        <StyledPlanWorkoutItemDumbbellIcon />
        <StyledPlanWorkoutItemDumbbellNum>
          {workout.reps}reps
        </StyledPlanWorkoutItemDumbbellNum>
      </StyledPlanWorkoutItemDetailContainer>
      <input type="checkbox" checked={checked} onClick={toggleChecked}/>
    </StyledPlanWorkoutItemContainer>
  );
}
