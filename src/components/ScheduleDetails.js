import React from 'react';
import styled from 'styled-components';
import firebase from '../utils/firebase';
import moment from 'moment';

const StyledLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
  width: 100%;
`;

const StyledTitle = styled.div`
  color: white;
  font-size: 25px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const StyledTitleContainer = styled.div`
  margin-top: 50px;
`;

const StyledCheckoutContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const StyledCheckoutBtn = styled.button`
  font-size: 20px;
  cursor: pointer;
`;

const StyledCancelContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCancelBtn = styled.button`
  font-size: 20px;
  cursor: pointer;
`;

export default function ScheduleDetails({ closeModal, selectedEvent }) {

  const onCancel = () => {
    const eventContent = {
      title: selectedEvent._def.title,
      id: selectedEvent._def.publicId,
      start: moment(selectedEvent._instance.range.start).format('YYYY-MM-DD'),
    };

    firebase
      .firestore()
      .collection('schedules')
      .doc(firebase.auth().currentUser.uid)
      .update({
        events: firebase.firestore.FieldValue.arrayRemove(eventContent),
      }).then(() => {
        alert('Cancel successfully!')
        closeModal()
      });
  };

  return (
    <>
      <StyledTitleContainer>
        <StyledLabel>Training Plan</StyledLabel>
        <StyledTitle>{selectedEvent._def.title}</StyledTitle>
      </StyledTitleContainer>
      <StyledCheckoutContainer>
        <StyledCheckoutBtn onClick={() => {
          window.open(`/plans/${selectedEvent._def.publicId}`)
        }}>
          Checkout the Plan
        </StyledCheckoutBtn>
      </StyledCheckoutContainer>
      <StyledCancelContainer>
        <StyledCancelBtn onClick={onCancel}>Cancel Training</StyledCancelBtn>
      </StyledCancelContainer>
    </>
  );
}
