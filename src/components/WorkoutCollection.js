import React from 'react'
import styled from 'styled-components';
import ProfileWorkout from './ProfileWorkout'
import { BsBookmarkFill } from 'react-icons/bs';

const StyledWorkoutCreationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 50px 0px ;
`;

const StyledCollectIcon = styled(BsBookmarkFill)`
  font-size: 40px;
  margin-left: 40px;
  color: #7d7d7d;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

export default function WorkoutCreation({workout}) {
  return (
    <StyledWorkoutCreationContainer>
      <ProfileWorkout workout={workout}/>
      <StyledCollectIcon />
    </StyledWorkoutCreationContainer>
  )
}