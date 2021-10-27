import React from 'react'
import styled from 'styled-components';
import Abs from '../images/muscle group/abs.png'
import Back from '../images/muscle group/back.png'
import Biceps from '../images/muscle group/biceps.png'
import Chest from '../images/muscle group/chest.png'
import Glutes from '../images/muscle group/glutes.png'
import Hamstrings from '../images/muscle group/hamstrings.png'
import Lowerback from '../images/muscle group/lowerback.png'
import Quadriceps from '../images/muscle group/quadriceps.png'
import Shoulder from '../images/muscle group/shoulder.png'
import Triceps from '../images/muscle group/triceps.png'

const StyledPlanDetails = styled.div`
  padding: 30px 0px 50px 70px;
  width: 400px;
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

  &:hover {
    border: 3px solid #1face1;
  }
`;

const StyledDescriptionInput = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 20px;
  outline: none;
`;

export default function PlanDetailsInput() {
  return (
    <StyledPlanDetails>
      <StyledCreateLabel>Title of the Plan</StyledCreateLabel>
      <StyledInput></StyledInput>
      <StyledCreateLabel>Target Muscle Group</StyledCreateLabel>
      <StyledTargetMuscleGroups>
        <StyledMuscleGroupImage src={Abs} />
        <StyledMuscleGroupImage src={Back} />
        <StyledMuscleGroupImage src={Biceps} />
        <StyledMuscleGroupImage src={Chest} />
        <StyledMuscleGroupImage src={Glutes} />
        <StyledMuscleGroupImage src={Hamstrings} />
        <StyledMuscleGroupImage src={Lowerback} />
        <StyledMuscleGroupImage src={Quadriceps} />
        <StyledMuscleGroupImage src={Shoulder} />
        <StyledMuscleGroupImage src={Triceps}/>
      </StyledTargetMuscleGroups>
      <StyledCreateLabel>Estimated Training Time</StyledCreateLabel>
      <StyledInput style={{ width: '60%' }}></StyledInput><StyledLabel>mins</StyledLabel>
      <StyledCreateLabel>Description</StyledCreateLabel>
      <StyledDescriptionInput></StyledDescriptionInput>
    </StyledPlanDetails>
  )
}
