import React from 'react'
import styled from 'styled-components';
import muscleGroupImage from '../utils/muscleGroup'

const StyledPlanDetails = styled.div`
  width: 100%;
  @media (min-width: 850px) {
    width: 45%;
  }
`;

const StyledCreateLabel = styled.div`
  color:#1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
`;

const StyledInput= styled.input`
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

const StyledMuscleGroupImage = styled.img`
  /* flex: 1 25%; */
  width: 70px;
  cursor: pointer;
  padding: 1px;
  border-radius: 50%;
  border: ${(props) => props.selected ? '3px solid #1face1' : 'none'};

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

export default function PlanDetailsInput({ setTitle, setDescription, setTargetMuscleGroup, targetMuscleGroup }) {
  return (
    <StyledPlanDetails>
      <StyledCreateLabel>Title of the Workout</StyledCreateLabel>
      <StyledInput onChange={(e) => {
        setTitle(e.target.value)
      }}/>
      <StyledCreateLabel>Target Muscle Group</StyledCreateLabel>
      <StyledTargetMuscleGroups>
        {
          muscleGroupImage.map((muscle) => {
            return <StyledMuscleGroupImage key={muscle.name} src={muscle.src} onClick={() => {
              setTargetMuscleGroup(muscle.name)
            }} selected={targetMuscleGroup === muscle.name} />
          })
        }
      </StyledTargetMuscleGroups>
      <StyledCreateLabel>Description</StyledCreateLabel>
      <StyledDescriptionInput onChange={(e) => {
        setDescription(e.target.value)
      }}/>
    </StyledPlanDetails>
  )
}
