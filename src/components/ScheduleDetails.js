import React from 'react';
import styled from 'styled-components';
import firebase from '../utils/firebase';
import moment from 'moment';
import { RiArticleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  display: flex;
  align-items: flex-start;
`;

const StyledTitleContainer = styled.div`
  margin-top: 50px;
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

const StyledTextIcon = styled(RiArticleLine)`
  font-size: 30px;
  margin-right: 5px;
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
        toast.success('Cancelled successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        })
        closeModal()
      });
  };

  return (
    <>
      <StyledTitleContainer>
        <StyledLabel>Training Plan</StyledLabel>
        <StyledTitle><StyledTextIcon/> {selectedEvent._def.title}</StyledTitle>
      </StyledTitleContainer>
      <StyledBtnContainer>
        <StyledCheckoutBtn onClick={() => {
          window.open(`/plans/${selectedEvent._def.publicId}`)
        }}>
          Checkout
        </StyledCheckoutBtn>
        <StyledCancelBtn onClick={onCancel}>Cancel</StyledCancelBtn>
      </StyledBtnContainer>
    </>
  );
}
