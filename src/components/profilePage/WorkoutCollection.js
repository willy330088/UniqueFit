import React from 'react';
import styled from 'styled-components';
import { FaDumbbell } from 'react-icons/fa';

import ProfileWorkout from './ProfileWorkout';
import { removeWorkoutCollection } from '../../utils/firebase';

export default function WorkoutCreation({ workout, userId }) {
  function removeCollected() {
    removeWorkoutCollection(workout.id, userId);
  }

  return (
    <StyledWorkoutCreationContainer>
      <ProfileWorkout workout={workout} />
      <StyledCollectIcon onClick={removeCollected} />
    </StyledWorkoutCreationContainer>
  );
}

const StyledWorkoutCreationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px;
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

const StyledCollectIcon = styled(FaDumbbell)`
  font-size: 50px;
  margin-left: 40px;
  color: #1face1;
  cursor: pointer;

  @media (min-width: 800px) {
    margin-left: auto;
  }

  &:hover {
    color: white;
  }
`;
