import React from 'react';
import styled from 'styled-components';
import ProfileWorkout from './ProfileWorkout';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import EditWorkoutPopup from './EditWorkoutPopup';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const StyledWorkoutCreationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 50px 0px;
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

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 700px;
    height: 800px;
    padding: 50px 100px;
    position: relative;
  }
`;

export default function WorkoutCreation({ workout }) {
  function deleteWorkout() {
    firebase
      .firestore()
      .collection('workouts')
      .doc(workout.id)
      .delete()
      .then(() => {
        firebase
          .storage()
          .ref('workout-videos/' + workout.id)
          .delete()
          .then(() => {
            firebase
              .firestore()
              .collection('plans')
              .get()
              .then((collectionSnapshot) => {
                collectionSnapshot.docs.forEach((docSnapshot) => {
                  const id = docSnapshot.id;
                  const plan = docSnapshot.data();
                  const workoutContents = plan.workoutSet;
                  const modified = workoutContents.filter((workoutContent) => {
                    if (workoutContent.workoutId !== workout.id) {
                      return workoutContent;
                    }
                  });
                  firebase
                    .firestore()
                    .collection('plans')
                    .doc(id)
                    .update({
                      workoutSet: modified,
                    })
                    .then(() => {
                      alert('Deleted Successfully!');
                    });
                });
              });
          });
      });
  }

  return (
    <StyledWorkoutCreationContainer>
      <ProfileWorkout workout={workout} />
      <StyledPopup trigger={<StyledPencilIcon />} modal nested>
        <EditWorkoutPopup workout={workout} />
      </StyledPopup>
      <StyledRemoveIcon onClick={deleteWorkout} />
    </StyledWorkoutCreationContainer>
  );
}
