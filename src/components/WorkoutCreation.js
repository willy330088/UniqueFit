import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileWorkout from './ProfileWorkout';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import EditWorkoutPopup from './EditWorkoutPopup';
import { firebase } from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import Delete from '../images/delete.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import ConfirmPopup from './ConfirmPopup';
import WorkoutItem from './WorkoutItem';

const StyledWorkoutCreationContainer = styled.div`
  margin: 50px 0px;

  @media (min-width: 800px) {
    display: flex;
    align-items: center;
  }
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
    width: 350px;
    height: 600px;
    padding: 20px 30px;
    position: relative;
    border-radius: 5px;

    @media (min-width: 500px) {
      width: 650px;
      height: 700px;
      border-radius: 10px;
    }

    @media (min-width: 650px) {
      padding: 30px 70px;
    }
  }
`;

const StyledToolContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 800px) {
    margin-left: auto;
  }
`;

export default function WorkoutCreation({ workout }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const closeConfirm = () => setConfirmOpen(false);
  const plans = useSelector((state) => state.plans);

  function deleteWorkout() {
    const workoutDeleting = toast.loading('Deleting Workout...', {
      position: toast.POSITION.TOP_CENTER,
    });

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
            const batch = firebase.firestore().batch();
            plans.forEach((plan) => {
              const workoutContents = plan.workoutSet;
              const modified = workoutContents.filter((workoutContent) => {
                if (workoutContent.workoutId !== workout.id) {
                  return workoutContent;
                }
              });
              batch.update(
                firebase.firestore().collection('plans').doc(plan.id),
                {
                  workoutSet: modified,
                }
              );
            });
            batch.commit().then(() => {
              toast.update(workoutDeleting, {
                render: 'Deleted Successfully',
                type: 'success',
                isLoading: false,
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
              });
              closeConfirm();
            });
          });
      });
  }

  return (
    <StyledWorkoutCreationContainer>
      <ProfileWorkout workout={workout} />
      <StyledToolContainer>
        <StyledPencilIcon
          onClick={() => {
            setOpen(true);
          }}
        />
        <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
          <EditWorkoutPopup workout={workout} close={closeModal} />
        </StyledPopup>
        <StyledRemoveIcon
          onClick={() => {
            setConfirmOpen(true);
          }}
        />
        <ConfirmPopup
          confirmOpen={confirmOpen}
          closeConfirm={closeConfirm}
          action={deleteWorkout}
          type={'delete'}
        />
      </StyledToolContainer>
    </StyledWorkoutCreationContainer>
  );
}
