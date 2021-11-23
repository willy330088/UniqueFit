import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '../utils/firebase';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const StyledLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledTitle = styled.div`
  color: white;
  font-size: 25px;
  display: flex;
  align-items: flex-start;
`;

const StyledTitleContainer = styled.div``;

const StyledStatusContainer = styled.div`
  margin-top: 30px;
`;

const StyledStatusInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 70px 0 50px 0;
`;

const StyledCheckoutBtn = styled.button`
  font-size: 20px;
  height: 40px;
  cursor: pointer;
  color: #1face1;
  border-radius: 5px;
  background-color: transparent;
  border: solid 2px #1face1;
  margin-right: 40px;

  &:hover {
    color: white;
    background-color: #1face1;
  }
`;

const StyledCancelBtn = styled.button`
  font-size: 20px;
  height: 40px;
  cursor: pointer;
  color: #1face1;
  border-radius: 5px;
  background-color: transparent;
  border: solid 2px #1face1;

  &:hover {
    color: white;
    background-color: #1face1;
  }
`;

const StyledToggle = styled.button`
  width: 60px;
  height: 30px;
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  background-color: ${(props) => (props.completed ? '#1face1' : '#353b48')};
  border: 3px solid white;

  @media (min-width: 500px) {
    width: 65px;
    height: 30px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0px;
    right: -5px;
    will-change: transform;
    transform: translate(${(props) => (props.completed ? -5 : -35)}px);
    transition: transform 0.2s ease-out;
    width: 20px;
    height: 20px;
    background: white;
    border: 2px solid #7f8fa6;
    outline: none;
    border-radius: 50%;

    @media (min-width: 500px) {
      top: 0px;
      right: 0px;
      will-change: transform;
      transform: translate(${(props) => (props.completed ? 0 : -35)}px);
      transition: transform 0.2s ease-out;
      width: 20px;
      height: 20px;
    }
  }
`;

export default function ScheduleDetails({ closeModal, selectedEvent }) {
  const [completed, setCompleted] = useState(
    selectedEvent.extendedProps.completed
  );
  const currentUser = useSelector((state) => state.currentUser);
  const events = useSelector((state) => state.users).filter(
    (user) => user.id === currentUser.uid
  )[0].events;

  const onRemove = () => {
    const eventContent = {
      extendedProps: selectedEvent._def.extendedProps,
      id: selectedEvent._def.publicId,
      start: moment(selectedEvent._instance.range.start).format('YYYY-MM-DD'),
    };

    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        events: firebase.firestore.FieldValue.arrayRemove(eventContent),
      })
      .then(() => {
        toast.success('Removed successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        closeModal();
      });
  };

  const toggleCompleted = () => {
    const event = events.filter(
      (event) => event.id === selectedEvent._def.publicId
    )[0];
    const index = events.indexOf(event);
    event.extendedProps.completed = !event.extendedProps.completed;
    events[index] = event;
    events.forEach((event) => {
      delete event['title'];
    });

    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        events: events,
      })
      .then(() => {
        setCompleted(!completed);
      });
  };

  return (
    <>
      <StyledTitleContainer>
        <StyledLabel>Training Plan</StyledLabel>
        <StyledTitle>{selectedEvent._def.title}</StyledTitle>
      </StyledTitleContainer>
      <StyledStatusContainer>
        <StyledLabel>Status</StyledLabel>
        <StyledStatusInputContainer>
          <StyledTitle>{completed ? 'Completed' : 'Incomplete'}</StyledTitle>
          <StyledToggle completed={completed} onClick={toggleCompleted} />
        </StyledStatusInputContainer>
      </StyledStatusContainer>
      <StyledBtnContainer>
        <StyledCheckoutBtn
          onClick={() => {
            window.open(`/plans/${selectedEvent._def.extendedProps.planId}`);
          }}
        >
          Checkout
        </StyledCheckoutBtn>
        <StyledCancelBtn onClick={onRemove}>Remove</StyledCancelBtn>
      </StyledBtnContainer>
    </>
  );
}
