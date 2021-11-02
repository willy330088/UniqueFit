import React, { useState } from 'react';
import styled from 'styled-components';
import muscleGroupImage from '../utils/muscleGroup';
import { MdPublic, MdPublicOff } from 'react-icons/md';

const StyledPlanDetails = styled.div`
  padding: 30px 0px 50px 70px;
  width: 400px;
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
  margin-bottom: 20px;
`;

const StyledTargetMuscleGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  color: white;
  font-size: 30px;
  margin-left: 20px;
`;

const StyledMuscleGroupImage = styled.img`
  /* flex: 1 25%; */
  width: 70px;
  cursor: pointer;
  padding: 1px;
  border-radius: 50%;
  border: ${(props) => (props.selected ? '3px solid #1face1' : 'none')};

  &:hover {
    border: 3px solid #1face1;
  }
`;

const StyledDescriptionInput = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 20px;
  outline: none;
  margin-bottom: 20px;
`;

const StyledToggle = styled.button`
  width: 80px;
  height: 40px;
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  background-color: ${(props) => (props.public ? '#1face1' : '#353b48')};
  border: 3px solid white;

  &::after {
    content: '';
    position: absolute;
    top: 0px;
    right: 5px;
    will-change: transform;
    transform: translate(${(props) => (props.public ? 5.5 : -35)}px);
    transition: transform 0.2s ease-out;
    width: 30px;
    height: 30px;
    background: white;
    border: 2px solid #7f8fa6;
    outline: none;
    border-radius: 50%;
  }
`;

const StyledToggleSet = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const StyledPublicOnIcon = styled(MdPublic)`
  color: white;
  font-size: 40px;
  margin-right: 20px;
`;

const StyledPublicOffIcon = styled(MdPublicOff)`
  color: white;
  font-size: 40px;
  margin-right: 20px;
`;

export default function PlanDetailsInput({
  setTitle,
  setDescription,
  setTargetMuscleGroup,
  targetMuscleGroup,
  setEstimatedTrainingTime,
  publicity,
  setPublicity,
}) {

  return (
    <StyledPlanDetails>
      <StyledCreateLabel>Title of the Plan</StyledCreateLabel>
      <StyledInput
        onChange={(e) => {
          setTitle(e.target.value);
        }}
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
      />
      <StyledLabel>mins</StyledLabel>
      <StyledCreateLabel>Description</StyledCreateLabel>
      <StyledDescriptionInput
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <StyledCreateLabel>Public</StyledCreateLabel>
      <StyledToggleSet>
        {publicity? <StyledPublicOnIcon/> : <StyledPublicOffIcon/> }
        <StyledToggle public={publicity} onClick={() => setPublicity(!publicity)} />
      </StyledToggleSet>
    </StyledPlanDetails>
  );
}
