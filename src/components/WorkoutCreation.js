import React, { useState } from 'react';
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
import Delete from '../images/delete.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  margin-left: auto;

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

const StyledConfirmDeletePopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 350px;
    height: 200px;
    position: relative;
    border-radius: 5px;
    position: relative;
  }
`;

const StyledConfirmTextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  position: absolute;
  right: calc(50% - 125px);
  top: 45px;
`;

const StyledConfirmDeleteIcon = styled.img`
  width: 35px;
  margin-right: 15px;
`;

const StyledConfirmDeleteText = styled.div`
  font-size: 25px;
  color: white;
`;

const StyledConfirmBtnContainer = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  display: flex;
`;

const StyledConfirmYesBtn = styled.div`
  width: 50%;
  height: 60px;
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  background-color: hsla(129, 40%, 50%);
  cursor: pointer;
  &:hover {
    background-color: hsla(129, 40%, 40%);
  }
`;

const StyledConfirmNoBtn = styled.div`
  width: 50%;
  height: 60px;
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  background-color: hsla(10, 100%, 50%);
  cursor: pointer;

  &:hover {
    background-color: hsla(10, 100%, 40%);
  }
`;

export default function WorkoutCreation({ workout }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const closeConfirm = () => setConfirmOpen(false);

  function deleteWorkout() {
    firebase
      .firestore()
      .collection('workouts')
      .doc(workout.id)
      .delete()
      .then(() => {
        console.log('h1');
        firebase
          .storage()
          .ref('workout-videos/' + workout.id)
          .delete()
          .then(() => {
            console.log('h2');
            firebase
              .firestore()
              .collection('plans')
              .get()
              .then((collectionSnapshot) => {
                toast.success('Deleted Successfully',{
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 2000,
                });
                closeConfirm();
                collectionSnapshot.docs.forEach((docSnapshot) => {
                  const id = docSnapshot.id;
                  const plan = docSnapshot.data();
                  const workoutContents = plan.workoutSet;
                  const modified = workoutContents.filter((workoutContent) => {
                    if (workoutContent.workoutId !== workout.id) {
                      return workoutContent;
                    }
                  });
                  firebase.firestore().collection('plans').doc(id).update({
                    workoutSet: modified,
                  });
                });
              });
          });
      });
  }

  return (
    <StyledWorkoutCreationContainer>
      <ProfileWorkout workout={workout} />
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
      <StyledConfirmDeletePopup
        open={confirmOpen}
        closeOnDocumentClick
        onClose={closeConfirm}
      >
        <StyledConfirmTextContainer>
          <StyledConfirmDeleteIcon src={Delete} />
          <StyledConfirmDeleteText>
            Are you sure you want to delete?
          </StyledConfirmDeleteText>
        </StyledConfirmTextContainer>
        <StyledConfirmBtnContainer>
          <StyledConfirmYesBtn
            onClick={() => {
              deleteWorkout();
            }}
          >
            Yes
          </StyledConfirmYesBtn>
          <StyledConfirmNoBtn
            onClick={() => {
              closeConfirm();
            }}
          >
            No
          </StyledConfirmNoBtn>
        </StyledConfirmBtnContainer>
      </StyledConfirmDeletePopup>
    </StyledWorkoutCreationContainer>
  );
}
