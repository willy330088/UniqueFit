import React from 'react'
import styled from 'styled-components';
import ProfileWorkout from './ProfileWorkout'
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

const StyledWorkoutCreationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 50px 0px ;
`;

const StyledPencilIcon = styled(BsFillPencilFill)`
  font-size: 40px;
  margin-left: 10px;
  color: #7d7d7d;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const StyledRemoveIcon = styled(FaTrashAlt)`
  font-size: 40px;
  margin-left: 40px;
  color: #7d7d7d;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

export default function WorkoutCreation() {
  return (
    <>
      <StyledWorkoutCreationContainer>
        <ProfileWorkout />
        <StyledPencilIcon />
        <StyledRemoveIcon />
      </StyledWorkoutCreationContainer>
      <StyledWorkoutCreationContainer>
        <ProfileWorkout />
        <StyledPencilIcon />
        <StyledRemoveIcon />
      </StyledWorkoutCreationContainer>
      <StyledWorkoutCreationContainer>
        <ProfileWorkout />
        <StyledPencilIcon />
        <StyledRemoveIcon />
      </StyledWorkoutCreationContainer>
      <StyledWorkoutCreationContainer>
        <ProfileWorkout />
        <StyledPencilIcon />
        <StyledRemoveIcon />
      </StyledWorkoutCreationContainer>
      <StyledWorkoutCreationContainer>
        <ProfileWorkout />
        <StyledPencilIcon />
        <StyledRemoveIcon />
      </StyledWorkoutCreationContainer>
    </>
  )
}
