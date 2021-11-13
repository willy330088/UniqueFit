import React from 'react';
import styled from 'styled-components';
import muscleGroupImage from '../utils/muscleGroup';
import { GiCheckMark } from 'react-icons/gi';

const StyledPlanDetails = styled.div`
  width: 100%;
`;

const StyledCreateLabel = styled.div`
  color: #1face1;
  font-size: 20px;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;

  @media (min-width: 500px) {
    font-size: 30px;
  }

  &::after {
    content: '${(props) => props.reminder}';
    color: #1face1;
    font-size: 18px;
    margin-left: 10px;
    display: none;

    @media (min-width: 650px) {
      display: inline;
    }
  }
`;

const StyledInput = styled.input`
  border: 1px solid #1face1;
  border-radius: 20px;
  height: 30px;
  font-size: 20px;
  padding: 10px 0 10px 20px;
  outline: none;
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 500px) {
    margin-bottom: 30px;
    height: 40px;
    font-size: 25px;
  }
`;

const StyledTargetMuscleGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 20px;

  @media (min-width: 500px) {
    margin-bottom: 20px;
  } 
`;

const StyledMuscleGroupImage = styled.img`
  width: 55px;
  cursor: pointer;
  border-radius: 50%;

  @media (min-width: 500px) {
    width: 70px;
  } 
`;

const StyledMuscleGroupContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin: 5px;
  position: relative;
  cursor: pointer;

  @media (min-width: 500px) {
    width: 70px;
    height: 70px;
  } 

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${(props) =>
      props.selected ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'};
    border-radius: 50%;
  }

  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const StyledCheckedIcon = styled(GiCheckMark)`
  color: white;
  position: absolute;
  font-size: 30px;
  right: calc(50% - 15px);
  top: calc(50% - 15px);
  display: ${(props) => props.selected ? 'block' : 'none'};
`

const StyledTimeInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTimeInput = styled.input`
  border: 1px solid #1face1;
  border-radius: 20px;
  height: 30px;
  font-size: 20px;
  padding: 10px 20px;
  width: 100px;
  outline: none;

  @media (min-width: 500px) {
    height: 40px;
  }
`;

const StyledLabel = styled.div`
  color: white;
  font-size: 20px;
  margin-left: 15px;

  @media (min-width: 500px) {
    font-size: 30px;
    margin-left: 20px;
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
      <StyledCreateLabel reminder={'(Choose 1 main muscle group)'}>
        {targetMuscleGroup === '' ? 'Target Muscle Group' : targetMuscleGroup}
      </StyledCreateLabel>
      <StyledTargetMuscleGroups>
        {muscleGroupImage.map((muscle) => {
          return (
            <StyledMuscleGroupContainer
              onClick={() => {
                setTargetMuscleGroup(muscle.name);
              }}
              selected={targetMuscleGroup === muscle.name}
              key={muscle.name}
            >
              <StyledCheckedIcon selected={targetMuscleGroup === muscle.name}/>
              <StyledMuscleGroupImage
                src={muscle.src}
              />
            </StyledMuscleGroupContainer>
          );
        })}
      </StyledTargetMuscleGroups>
      <StyledCreateLabel>Estimated Training Time</StyledCreateLabel>
      <StyledTimeInputContainer>
        <StyledTimeInput
          placeholder='0'
          type="number"
          min="0"
          onChange={(e) => {
            setEstimatedTrainingTime(e.target.value);
          }}
          value={estimatedTrainingTime}
        />
        <StyledLabel>mins</StyledLabel>
      </StyledTimeInputContainer>
    </StyledPlanDetails>
  );
}
