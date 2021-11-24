import React from 'react';
import styled from 'styled-components';
import ProfileWorkout from './ProfileWorkout';
import { FaDumbbell } from 'react-icons/fa';
import { firebase } from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

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

export default function WorkoutCreation({ workout }) {
  function removeCollected() {
    const uid = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection('workouts')
      .doc(workout.id)
      .update({
        collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
      });
  }

  return (
    <StyledWorkoutCreationContainer>
      <ProfileWorkout workout={workout} />
      <StyledCollectIcon onClick={removeCollected} />
    </StyledWorkoutCreationContainer>
  );
}
