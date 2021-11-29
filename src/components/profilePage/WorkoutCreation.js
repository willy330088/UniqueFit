import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileWorkout from './ProfileWorkout';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import EditWorkoutPopup from './EditWorkoutPopup';
import { deleteWorkout } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import ConfirmPopup from '../common/ConfirmPopup';
import { loadingToast, loadingCompletedToast } from '../../utils/toast';

export default function WorkoutCreation({ workout }) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const plans = useSelector((state) => state.plans);

  function closeModal() {
    setOpen(false);
  }

  function closeConfirm() {
    setConfirmOpen(false);
  }

  async function deleteWorkoutCreation() {
    const workoutDeleting = loadingToast('Deleting Workout...');
    await deleteWorkout(workout.id, plans);
    loadingCompletedToast('Deleted Successfully', workoutDeleting);
    closeConfirm();
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
          action={deleteWorkoutCreation}
          type={'delete'}
        />
      </StyledToolContainer>
    </StyledWorkoutCreationContainer>
  );
}

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
