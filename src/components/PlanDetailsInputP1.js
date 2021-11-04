import React from 'react';
import styled from 'styled-components';
import muscleGroupImage from '../utils/muscleGroup';
import { MdPublic, MdPublicOff } from 'react-icons/md';

const StyledPlanDetails = styled.div`
  width: 100%;
`;

const StyledCreateLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  border: 1px solid #1face1;
  border-radius: 20px;
  height: 50px;
  font-size: 25px;
  padding: 10px;
  outline: none;
  width: 100%;
  margin-bottom: 50px;
`;

const StyledTargetMuscleGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 50px;
`;

const StyledLabel = styled.label`
  color: white;
  font-size: 30px;
  margin-left: 20px;
`;

const StyledMuscleGroupImage = styled.img`
  width: 70px;
  cursor: pointer;
  padding: 1px;
  border-radius: 50%;
  border: ${(props) => (props.selected ? '3px solid #1face1' : 'none')};

  &:hover {
    border: 3px solid #1face1;
  }
`;

export default function PlanDetailsInput({
  title,
  setTitle,
  targetMuscleGroup,
  setTargetMuscleGroup,
  estimatedTrainingTime,
  setEstimatedTrainingTime,
}) {

  return (
    <StyledPlanDetails>
      <StyledCreateLabel>Title of the Plan</StyledCreateLabel>
      <StyledInput
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <StyledCreateLabel>Target Muscle Group</StyledCreateLabel>
      <StyledTargetMuscleGroups>
        {muscleGroupImage.map((muscle) => {
          return (
            <StyledMuscleGroupImage
              key={muscle.name}
              src={muscle.src}
              onClick={() => {
                setTargetMuscleGroup(muscle.name);
              }}
              selected={targetMuscleGroup === muscle.name}
            />
          );
        })}
      </StyledTargetMuscleGroups>
      <StyledCreateLabel>Estimated Training Time</StyledCreateLabel>
      <StyledInput
        style={{ width: '60%' }}
        onChange={(e) => {
          setEstimatedTrainingTime(e.target.value);
        }}
        value={estimatedTrainingTime}
      />
      <StyledLabel>mins</StyledLabel>
    </StyledPlanDetails>
  );
}
